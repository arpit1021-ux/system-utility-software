//go:build linux

package collect

import (
	"os/exec"
	"strings"
	"strconv"
	"system-agent/common"
)

func CollectInfo(info *types.SystemInfo) {
	//Disk Encription

	// Check if /dev/mapper/ is used (common for LUKS)
	out, err := exec.Command("lsblk", "-o", "NAME,MOUNTPOINT").Output()
	if err != nil {
		info.DiskEncrypted = false
		return
	}
	output := string(out)

	info.DiskEncrypted = strings.Contains(output, "/dev/mapper/") ||
		strings.Contains(output, "crypt")

	//Antivirus Detection
	// Check if ClamAV or similar process is running
	cmd := exec.Command("pgrep", "-f", "clamd")
	out, err = cmd.Output()
	info.AntivirusActive = err == nil && strings.TrimSpace(string(out)) != ""	

	//Inactivity Sleep Detection
	cmd = exec.Command("gsettings", "get", "org.gnome.settings-daemon.plugins.power", "sleep-inactive-ac-timeout")
	out, err = cmd.Output()
	if err == nil {
		timeoutStr := strings.TrimSpace(string(out))
		val, err := strconv.Atoi(timeoutStr)
		if err == nil {
			info.InactivitySleep = val / 60
		}
	}

	//OS updated status
	cmd = exec.Command("apt", "list", "--upgradable")
	out, err = cmd.Output()
	if err == nil {
		lines := strings.Split(string(out), "\n")
		info.OSUpdated = len(lines) <= 1 // Only header present means no updates
	}


}
