package collect

import (
	"os"
	"os/exec"
	"runtime"
	"strings"

	"system-agent/common"
	"system-agent/utils"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
)

func getOSName(goOS string) string {
	switch goOS {
	case "darwin":
		return "macOS"
	case "windows":
		return "Windows"
	case "linux":
		return "Linux"
	default:
		return goOS
	}
}

func GetCommonInfo() common.SystemInfo {
	hostname, _ := os.Hostname()
	user := os.Getenv("USER")
	if user == "" {
		user = os.Getenv("USERNAME")
	}

	hInfo, _ := host.Info()
	cpuInfo, _ := cpu.Info()
	vmem, _ := mem.VirtualMemory()

	model := hInfo.Platform
	serial := hInfo.HostID

	if model == "" && runtime.GOOS == "linux" {
		out, err := exec.Command("cat", "/sys/devices/virtual/dmi/id/product_name").Output()
		if err == nil {
			model = strings.TrimSpace(string(out))
		}
	}

	ip := utils.GetLocalIP()

	return common.SystemInfo{
		Hostname:     hostname,
		IP:           ip,
		OS:           getOSName(runtime.GOOS),
		OSVersion:    hInfo.PlatformVersion,
		Model:        model,
		Processor:    cpuInfo[0].ModelName,
		Memory:       int(vmem.Total / 1024 / 1024),
		SerialNumber: serial,
		User:         user,
	}
}
