package collect

import (
	"os"
	"os/exec"
	"runtime"
	"strings"

	"system-agent/utils"
	"system-agent/common"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
)



func GetCommonInfo() types.SystemInfo {
	hostname, _ := os.Hostname()
	user := os.Getenv("USER")
	if user == "" {
		user = os.Getenv("USERNAME")
	}

	hInfo, _ := host.Info()
	cpuInfo, _ := cpu.Info()
	vmem, _ := mem.VirtualMemory()

	model := hInfo.Platform
	serial := hInfo.HostID // Best effort, not always available

	// If model is empty, try fallback on Linux
	if model == "" && runtime.GOOS == "linux" {
		out, err := exec.Command("cat", "/sys/devices/virtual/dmi/id/product_name").Output()
		if err == nil {
			model = strings.TrimSpace(string(out))
		}
	}

	// Simple IP placeholder for now
	ip := utils.GetLocalIP()

	return types.SystemInfo{
		Hostname:     hostname,
		IP:           ip,
		OS:           runtime.GOOS,
		OSVersion:    hInfo.PlatformVersion,
		Model:        model,
		Processor:    cpuInfo[0].ModelName,
		Memory:       int(vmem.Total / 1024 / 1024), // In MB
		SerialNumber: serial,
		User:         user,
	}
}
