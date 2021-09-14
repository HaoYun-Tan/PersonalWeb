package users

import (
	"net/http"
	"personal-web-server/common/auth"

	"github.com/gin-gonic/gin"
)

type UserContext struct {
	ID uint
}

func UpdateUserContext(c *gin.Context, user_id uint) {
	userContextInterface, exists := c.Get("user_context")
	userContext := UserContext{}
	if exists {
		userContext = userContextInterface.(UserContext)
	}

	userContext.ID = user_id

	c.Set("user_context", userContext)
}

func ResetUserContext(c *gin.Context) {
	UpdateUserContext(c, 0)
}

func AuthMiddleware(auto401 bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		ResetUserContext(c)

		jwtInst := auth.GetJwtInstance()
		token, err := jwtInst.ParseToken(c)

		if err != nil {
			if auto401 {
				c.AbortWithError(http.StatusUnauthorized, err)
			}
			return
		}

		if claims, valid := jwtInst.VerifyTokenPayload(token); valid {
			UpdateUserContext(c, claims.ID)
		} else {
			if auto401 {
				c.AbortWithStatus(http.StatusUnauthorized)
			}
			return
		}
	}
}
