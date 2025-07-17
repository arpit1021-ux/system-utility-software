package types

type SystemInfo struct {
	Hostname        string
	IP              string
	OS              string
	OSVersion       string
	Model           string
	Processor       string
	Memory          int
	SerialNumber    string
	User            string
	DiskEncrypted   bool
	AntivirusActive bool
	InactivitySleep int //in minutes
	OSUpdated       bool
	OwnerID   	    string
}
