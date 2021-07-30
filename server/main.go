package main

import (
	"personal-web-server/database"
	"personal-web-server/service/articles"
	"personal-web-server/service/users"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDB()

	users.AutoMigrate()
	articles.AutoMigrate()

	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"msg": "pong",
		})
	})

	articles.RegisterAllRoutes(r.Group("/api"))

	r.Run()
}
