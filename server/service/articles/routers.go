package articles

import (
	"errors"
	"log"
	"net/http"
	"personal-web-server/common/util"
	"personal-web-server/database"
	"personal-web-server/service/permissions"
	"personal-web-server/service/users"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type ArticleValidator struct {
	Title string `form:"title" json:"title"  binding:"required"`
	Text  string `form:"text" json:"text" `
}

type ArticleBrief struct {
	ID        uint
	Title     string
	Abstract  string
	UserId    uint
	CreatedAt time.Time
	UpdatedAt time.Time
}

func GetUserContext(c *gin.Context) (users.UserContext, error) {
	userContextInterface, exists := c.Get("user_context")

	if exists {
		userContext, ok := userContextInterface.(users.UserContext)
		if ok {
			return userContext, nil
		}
	}

	return users.UserContext{}, errors.New("failed to get user context")
}

func GetUserIdFromContext(c *gin.Context) (uint, error) {
	userContext, err := GetUserContext(c)
	if err != nil {
		return 0, err
	}

	return userContext.ID, nil
}

func RegisterNonAuthRoutes(r *gin.RouterGroup) {
	r.GET("/articles", func(c *gin.Context) {

		var articles []Article
		result := database.GetDB().Find(&articles)
		if result.Error != nil {
			return
		}

		var articlesBrief []ArticleBrief
		for _, article := range articles {
			articlesBrief = append(articlesBrief,
				ArticleBrief{
					ID:        article.ID,
					Title:     article.Title,
					Abstract:  article.Abstract,
					UserId:    article.UserId,
					CreatedAt: article.CreatedAt,
					UpdatedAt: article.UpdatedAt,
				})
		}

		c.JSON(http.StatusOK, gin.H{
			"data": articlesBrief,
		})
	})
}

func RegisterAllRoutes(r *gin.RouterGroup) {

	r.GET("/article", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Query("article_id"))

		if err != nil {
			c.JSON(400, gin.H{
				"msg": "invalid id, article id should be an interger",
			})
			return
		}

		userId, errUserId := GetUserIdFromContext(c)
		if errUserId != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"msg": "system internal error",
			})
			return
		}

		if !permissions.IsUserHasArticleReadPerm(userId) {
			c.JSON(401, gin.H{
				"msg": "No Permission",
			})
			return
		}

		// find the article
		article := Article{}
		result := database.GetDB().First(&article, "id = ? and user_id = ?", id, userId)
		if result.Error != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"msg": "User Id or Article Id invalid",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": article,
		})
	})

	r.POST("/article", func(c *gin.Context) {
		Av := ArticleValidator{}
		user := users.User{}
		if err := c.ShouldBindJSON(&Av); err != nil {
			log.Println(err.Error())
			c.JSON(400, gin.H{
				"msg": "invalid article content",
			})
			return
		}

		userId, errUserId := GetUserIdFromContext(c)
		if errUserId != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"msg": "system internal error",
			})
			return
		}

		result := database.GetDB().First(&user, "id = ?", userId)
		if result.Error != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"msg": "can not find user",
			})
			return
		}

		if !permissions.IsUserHasArticleWritePerm(user.ID) {
			c.JSON(401, gin.H{
				"msg": "No Permission",
			})
			return
		}

		article := Article{Title: Av.Title, Abstract: util.GenerateAbstract(Av.Text, 512), Text: Av.Text, UserId: userId}
		result = database.GetDB().Create(&article)

		if result.Error != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"msg": "interinor failure",
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"msg": "article created successfully",
		})

	})
}
