package articles

import (
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
	Title  string `form:"title" json:"title"  binding:"required"`
	Text   string `form:"text" json:"text" `
	UserId uint   `form:"user_id" json:"user_id" binding:"required"`
}

type ArticleBrief struct {
	ID        uint
	Title     string
	Abstract  string
	UserId    uint
	CreatedAt time.Time
	UpdatedAt time.Time
}

func RegisterAllRoutes(r *gin.RouterGroup) {

	r.GET("/articles", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Query("user_id"))

		if err != nil {
			c.JSON(400, gin.H{
				"msg": "user id should be an interger",
			})
			return
		}

		var articles []Article
		result := database.GetDB().Find(&articles, "user_id = ?", id)
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

	r.GET("/article", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Query("article_id"))

		id_user_u64, err_user := strconv.ParseUint(c.Query("user_id"), 10, 64)
		id_user := uint(id_user_u64)

		if err != nil {
			c.JSON(400, gin.H{
				"msg": "invalid id, article id should be an interger",
			})
			return
		}

		if err_user != nil {
			c.JSON(400, gin.H{
				"msg": "invalid user id, user id should be an interger",
			})
			return
		}

		// check permission
		//
		//

		if !permissions.IsUserHasArticleReadPerm(id_user) {
			c.JSON(401, gin.H{
				"msg": "No Permission",
			})
			return
		}

		// find the article
		article := Article{}
		result := database.GetDB().First(&article, "id = ? and user_id = ?", id, id_user)
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

		result := database.GetDB().First(&user, "id = ?", Av.UserId)
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

		article := Article{Title: Av.Title, Abstract: util.GenerateAbstract(Av.Text, 512), Text: Av.Text, UserId: Av.UserId}
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
