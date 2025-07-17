//go:build windows
// +build windows

package collect

import (
	"bytes"
	"encoding/json"
	"os/exec"
	"regexp"
	"strconv"
	"strings"
	"system-agent/common"
)

func CollectInfo(info *types.SystemInfo) {
	//Disk Encryption
	cmd := exec.Command("manage-bde", "-status")
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		info.DiskEncrypted = false
		return
	}

	// Look for "Conversion Status: Fully Encrypted"
	output := out.String()
	if strings.Contains(output, "Conversion Status:") {
		lines := strings.Split(output, "\n")
		for _, line := range lines {
			if strings.Contains(line, "Conversion Status") && strings.Contains(line, "Fully Encrypted") {
				info.DiskEncrypted = true
				return
			}
		}
	}
	info.DiskEncrypted = false

	// Check Windows Defender Status via PowerShell
	cmd = exec.Command("powershell", "-Command", "Get-MpComputerStatus | ConvertTo-Json")
	outputBytes, err := cmd.Output()
	if err != nil {
		info.AntivirusActive = false
		return
	}

	var result map[string]interface{}
	err = json.Unmarshal(outputBytes, &result)
	if err != nil {
		info.AntivirusActive = false
		return
	}

	if enabled, ok := result["AntivirusEnabled"].(bool); ok {
		info.AntivirusActive = enabled
	} else {
		info.AntivirusActive = false
	}

	// Get current sleep timeout in AC mode
	cmd = exec.Command("powercfg", "/query", "SCHEME_CURRENT", "SUB_SLEEP", "STANDBYIDLE")
	outputBytes, err = cmd.Output()

	if err == nil {
		// Parse something like: "Power Setting Index: 0x0000000a"
		re := regexp.MustCompile(`Power Setting Index:\s+0x([0-9a-fA-F]+)`)
		match := re.FindStringSubmatch(string(outputBytes))
		if len(match) > 1 {
			hex := match[1]
			val, err := strconv.ParseInt(hex, 16, 64)
			if err == nil {
				info.InactivitySleep = int(val/60) // seconds to minutes
			}
		}
	}

	//Os Update Status
	cmd = exec.Command("powershell", "-Command", "(New-Object -ComObject Microsoft.Update.AutoUpdate).DetectNow(); (New-Object -ComObject Microsoft.Update.AutoUpdate).Results | ConvertTo-Json")
	outputBytes, err = cmd.Output()
	if err == nil {
		var updateStatus map[string]interface{}
		if err = json.Unmarshal(outputBytes, &updateStatus); err == nil {
			if status, ok := updateStatus["LastInstallationSuccessDate"]; ok && status != nil {
				info.OSUpdated = true
			}
		}
	}

}
