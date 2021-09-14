package main

import (
	"personal-web-server/database"
	"personal-web-server/service/articles"
	"personal-web-server/service/comments"
	"personal-web-server/service/permissions"
	"personal-web-server/service/users"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDB()

	users.AutoMigrate()
	articles.AutoMigrate()
	comments.AutoMigrate()
	permissions.AutoMigrate()

	r := gin.Default()
	r.Use(cors.Default())

	routerGroupAPI := r.Group("/api")

	// non auth routes
	users.RegisterNonAuthRoutes(routerGroupAPI)

	routerGroupAPI.Use(users.AuthMiddleware(true))

	// auth routes
	articles.RegisterAllRoutes(routerGroupAPI)
	comments.RegisterAllRoutes(routerGroupAPI)
	permissions.RegisterAllRoutes(routerGroupAPI)

	r.Run()
}
