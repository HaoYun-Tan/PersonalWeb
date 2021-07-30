package users

import (
	"personal-web-server/database"
)

type User struct {
	ID           uint
	PermissionID uint
	UserName     string
	PasswordHash string
	Email        string
}

func AutoMigrate() {
	database.GetDB().AutoMigrate(&User{})
}
