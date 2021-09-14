package users

import (
	"log"
	"net/http"
	"personal-web-server/common/auth"
	"personal-web-server/database"
	"personal-web-server/service/permissions"

	"github.com/gin-gonic/gin"
)

type UserRegisterValidator struct {
	Username string `json:"username" binding:"required,alphanum,min=4,max=255"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,alphanum,min=8,max=255"`
}

type UserLoginValidator struct {
	Username string `json:"username" binding:"required,alphanum,min=4,max=255"`
	Password string `json:"password" binding:"required,alphanum,min=8,max=255"`
}

func RegisterNonAuthRoutes(r *gin.RouterGroup) {
	r.POST("/register", func(c *gin.Context) {
		urv := UserRegisterValidator{}

		if err := c.ShouldBindJSON(&urv); err != nil {
			c.JSON(400, gin.H{
				"msg": "invalid input content",
			})
			return
		}

		// TODO: change all DB operations to a transaction
		// need to rollback if any of these operations are failed.

		user := User{}
		user.UserName = urv.Username
		user.Email = urv.Email
		user.SetPassword(urv.Password)
		result := database.GetDB().Create(&user)
		if result.Error != nil {
			log.Println(result.Error)
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"msg": "duplicated user, please choose another one",
			})
			return
		}

		permission := permissions.Permission{}
		existPermission := permissions.Permission{}
		result = database.GetDB().First(&existPermission, "user_id = ?", user.ID)
		if result.Error != nil || result.RowsAffected <= 0 {
			// create new permission
			permission.Articles = 1
			permission.Comments = 2
			permission.UserId = user.ID

			err := database.GetDB().Save(&permission).Error
			if err != nil {
				c.JSON(http.StatusUnprocessableEntity, gin.H{
					"msg": "system internal error",
				})
				return
			}
		} else {
			permission = existPermission
		}

		user.PermissionID = permission.ID
		err := database.GetDB().Save(&user).Error
		if err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"msg": "system internal error",
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"msg": "Successfuly registered a new account.",
		})
	})

	r.POST("/login", func(c *gin.Context) {
		ulv := UserLoginValidator{}

		if err := c.ShouldBindJSON(&ulv); err != nil {
			c.JSON(400, gin.H{
				"msg": "invalid input content",
			})
			return
		}

		user := User{}
		result := database.GetDB().First(&user, "user_name = ?", ulv.Username)

		if result.Error != nil {
			c.JSON(400, gin.H{
				"msg": "User does not exsit",
			})
			return
		}

		if user.CheckPassword(ulv.Password) != nil {
			c.JSON(400, gin.H{
				"msg": "wrong password",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": gin.H{
				"token": auth.GenJwtToken(user.ID),
			},
		})
	})
}
