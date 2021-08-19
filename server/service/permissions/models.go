package permissions

import (
	"personal-web-server/database"

	"gorm.io/gorm"
)

const (
	NO_PERM    = 0
	READ_PERM  = 1
	WRITE_PERM = 2
)

type Permission struct {
	gorm.Model
	Articles int  `gorm:"not null"`
	Comments int  `gorm:"not null"`
	UserId   uint `gorm:"not null;unique"`
}

func AutoMigrate() {
	database.GetDB().AutoMigrate(&Permission{})
}

func CheckUserArticlePerm(user_id uint) int {
	perm := Permission{}
	result := database.GetDB().First(&perm, "user_id = ?", user_id)
	if result.Error != nil {
		return NO_PERM
	}

	return perm.Articles
}

func CheckUserCommentPerm(user_id uint) int {
	perm := Permission{}
	result := database.GetDB().First(&perm, "user_id = ?", user_id)
	if result.Error != nil {
		return NO_PERM
	}

	return perm.Comments
}

func IsUserHasArticleReadPerm(user_id uint) bool {
	return CheckUserArticlePerm(user_id) >= READ_PERM
}

func IsUserHasArticleWritePerm(user_id uint) bool {
	return CheckUserArticlePerm(user_id) >= WRITE_PERM
}

func IsUserHasCommentReadPerm(user_id uint) bool {
	return CheckUserCommentPerm(user_id) >= READ_PERM
}

func IsUserHasCommentWritePerm(user_id uint) bool {
	return CheckUserCommentPerm(user_id) >= WRITE_PERM
}
