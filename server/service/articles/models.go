package articles

import (
	"personal-web-server/database"

	"gorm.io/gorm"
)

//
type Article struct {
	gorm.Model
	Title    string `gorm:"not null"`
	Abstract string
	Text     string
	UserId   uint `gorm:"not null"`
}

func AutoMigrate() {
	database.GetDB().AutoMigrate(&Article{})
}
