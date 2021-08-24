package permissions

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PermissionValidator struct {
	gorm.Model
	Articles int  `gorm:"not null"`
	Comments int  `gorm:"not null"`
	UserId   uint `gorm:"not null;unique"`
}

func RegisterAllRoutes(r *gin.RouterGroup) {

	r.GET("/permissions/:user_id", func(c *gin.Context) {
		id_user_u64, err_user := strconv.ParseUint(c.Param("user_id"), 10, 64)
		id_user := uint(id_user_u64)

		if err_user != nil {
			c.JSON(400, gin.H{
				"msg": "user id should be an interger",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": gin.H{
				"permissions": gin.H{
					"articles": gin.H{
						"read":  IsUserHasArticleReadPerm(id_user),
						"write": IsUserHasArticleWritePerm(id_user),
					},
					"comments": gin.H{
						"read":  IsUserHasCommentReadPerm(id_user),
						"write": IsUserHasCommentWritePerm(id_user),
					},
				},
			},
		})
	})
}
