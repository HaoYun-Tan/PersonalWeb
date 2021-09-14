package users

import (
	"errors"
	"personal-web-server/database"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	PermissionID uint
	UserName     string `gorm:"not null;unique"`
	PasswordHash string `gorm:"not null"`
	Email        string `gorm:"not null;unique"`
}

func AutoMigrate() {
	database.GetDB().AutoMigrate(&User{})
}

func (u *User) SetPassword(password string) error {
	if len(password) <= 0 {
		return errors.New("password should not be empty")
	}

	bytesPwd := []byte(password)
	pwdHash, _ := bcrypt.GenerateFromPassword(bytesPwd, bcrypt.DefaultCost)
	u.PasswordHash = string(pwdHash)
	return nil
}

func (u *User) CheckPassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password))
}
