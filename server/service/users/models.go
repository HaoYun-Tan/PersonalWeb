package users

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type User struct {
}

func AutoMigrate() {
	config := postgres.Config{DSN: "host=localhost user=test password=test dbname=personal_web port=5432"}
	db, _ := gorm.Open(postgres.New(config), &gorm.Config{})
	db.AutoMigrate(&User{})
}
