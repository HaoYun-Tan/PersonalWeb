package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Database struct {
	*gorm.DB
}

var dbInst *gorm.DB

// Using this function to get a connection.
func GetDB() *gorm.DB {
	if dbInst == nil {
		InitDB()
	}
	return dbInst
}

// Opening a database and save the reference to `Database` struct.
func InitDB() {

	postgres_conf := postgres.Config{
		DSN: "host=localhost user=test password=test dbname=personal_web port=5432",
	}

	db, err := gorm.Open(postgres.New(postgres_conf), &gorm.Config{})
	if err != nil {
		log.Panicln("failed to connect database")
		return
	}

	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)

	dbInst = db
}
