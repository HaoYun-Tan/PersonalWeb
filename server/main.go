package main

import (
	"personal-web-server/service/articles"
	"personal-web-server/service/users"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	config := postgres.Config{DSN: "host=localhost user=test password=test dbname=personal_web port=5432"}
	gorm.Open(postgres.New(config), &gorm.Config{})

	users.AutoMigrate()
	articles.AutoMigrate()

	r := gin.Default()

	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"msg": "pong",
		})
	})
	r.Run()
}
