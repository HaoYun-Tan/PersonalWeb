package comments

import (
	"log"
	"net/http"
	"personal-web-server/common/util"
	"personal-web-server/database"
	"personal-web-server/service/articles"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type CommentValidator struct {
	Title     string `form:"title" json:"title"  binding:"required"`
	Text      string `form:"text" json:"text" `
	UserId    uint   `form:"user_id" json:"user_id" binding:"required"`
	ArticleId uint   `form:"article_id" json:"article_id" binding:"required"`
}

type CommentBrief struct {
	ID        uint
	Title     string
	Abstract  string
	UserId    uint
	ArticleId uint
	CreatedAt time.Time
	UpdatedAt time.Time
}

func RegisterAllRoutes(r *gin.RouterGroup) {

	r.GET("/articles/:article_id/comments", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("article_id"))

		if err != nil {
			c.JSON(400, gin.H{
				"msg": "article id should be an interger",
			})
			return
		}

		var comments []Comment
		result := database.GetDB().Find(&comments, "article_id = ?", id)
		if result.Error != nil {
			return
		}

		var commentsBrief []CommentBrief
		for _, comment := range comments {
			commentsBrief = append(commentsBrief,
				CommentBrief{
					ID:        comment.ID,
					Title:     comment.Title,
					Abstract:  comment.Abstract,
					UserId:    comment.UserId,
					ArticleId: comment.ArticleId,
					CreatedAt: comment.CreatedAt,
					UpdatedAt: comment.UpdatedAt,
				})
		}

		c.JSON(http.StatusOK, gin.H{
			"data": commentsBrief,
		})
	})

	r.GET("/comments/:comment_id", func(c *gin.Context) {
		comment_id, comment_err := strconv.Atoi(c.Param("comment_id"))

		if comment_err != nil {
			c.JSON(400, gin.H{
				"msg": "comment id should be an interger",
			})
			return
		}

		// check permission
		//
		//

		// find the article
		comment := Comment{}
		result := database.GetDB().First(&comment, "id = ?", comment_id)
		if result.Error != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"msg": "Comment Id invalid",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": comment,
		})
	})

	r.POST("/comments/:article_id", func(c *gin.Context) {
		Av := CommentValidator{}
		article := articles.Article{}

		if err := c.ShouldBindJSON(&Av); err != nil {
			log.Println(err.Error())
			c.JSON(400, gin.H{
				"msg": "invalid article content",
			})
			return
		}

		result := database.GetDB().First(&article, "id = ?", Av.ArticleId)
		if result.Error != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"msg": "can not find article",
			})
			return
		}

		comment := Comment{Title: Av.Title, Abstract: util.GenerateAbstract(Av.Text, 256), Text: Av.Text, UserId: Av.UserId, ArticleId: Av.ArticleId}
		result = database.GetDB().Create(&comment)

		if result.Error != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{
				"msg": "interinor failure",
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"msg": "comment created successfully",
		})

	})
}
