//go:build windows

package utils

import (
	"golang.org/x/sys/windows"
)

func IsAdmin() bool {
	var sid *windows.SID
	sid, _ = windows.CreateWellKnownSid(windows.WinBuiltinAdministratorsSid)
	token := windows.Token(0)
	isMember, err := token.IsMember(sid)
	return err == nil && isMember
}
