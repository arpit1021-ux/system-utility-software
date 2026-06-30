package common

type SystemInfo struct {
	Hostname        string `json:"hostname"`
	IP              string `json:"ip"`
	OS              string `json:"os"`
	OSVersion       string `json:"os_version"`
	Model           string `json:"model"`
	Processor       string `json:"processor"`
	Memory          int    `json:"memory"`
	SerialNumber    string `json:"serial_number"`
	User            string `json:"user"`
	DiskEncrypted   bool   `json:"disk_encrypted"`
	AntivirusActive bool   `json:"antivirus_active"`
	InactivitySleep int    `json:"inactivity_sleep"`
	OSUpdated       bool   `json:"os_updated"`
	OwnerID         string `json:"owner_id"`
}
