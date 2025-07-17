//go:build linux

package utils




import (
	"os/user"
)

func IsAdmin() bool {
	currentUser, err := user.Current()
	if err != nil {
		return false
	}
	return currentUser.Uid == "0" // UID 0 means root on Unix systems
}
