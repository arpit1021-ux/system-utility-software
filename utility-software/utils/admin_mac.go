//go:build darwin
package utils

import (
	"os/user"
	"fmt"
)

func IsAdmin() bool {
	currentUser, err := user.Current()
	if err != nil {
		fmt.Println("Error getting user:", err)
		return false
	}

	// UID 0 is root on macOS too
	if currentUser.Uid == "0" {
		return true
	}

	// Optionally check if user is in admin group (typically GID 80 on macOS)
	// This part is macOS-specific:
	if currentUser.Gid == "80" {
		return true
	}

	return false
}
