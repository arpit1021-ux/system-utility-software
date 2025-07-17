//go:build darwin

package collect

import (
	"os/exec"
	"strings"
	"strconv"
	"regexp"
	"system-agent/common"
)

func CollectInfo(info *types.SystemInfo) {

	//Disk-Encrypted

	// Add macOS-specific data collection here
	cmd := exec.Command("fdesetup", "status")
	out, err := cmd.Output()
	if err != nil {
		info.DiskEncrypted = false
		return
	}
	output := string(out)
	info.DiskEncrypted = strings.Contains(output, "FileVault is On.")

	//Anti-virus Detection
	// Check for presence of Apple's XProtect
	cmd = exec.Command("defaults", "read", "/System/Library/CoreServices/XProtect.bundle/Contents/Resources/XProtect.meta.plist")
	_, err = cmd.Output()
	info.AntivirusActive = err == nil

	//Inactivity Sleep detection
	cmd = exec.Command("pmset", "-g", "custom")
	out, err = cmd.Output()
	if err == nil {
		re := regexp.MustCompile(`sleep\s+(\d+)`)
		match := re.FindStringSubmatch(string(out))
		if len(match) > 1 {
			val, err := strconv.Atoi(match[1])
			if err == nil {
				info.InactivitySleep = val
			}
		}
	}

	//OS Updated Status
	cmd = exec.Command("softwareupdate", "-l")
	out, err = cmd.Output()
	if err == nil {
		info.OSUpdated = !strings.Contains(string(out), "*") // updates usually marked with *
	}

}
