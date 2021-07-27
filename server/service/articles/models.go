package articles

import "gorm.io/gorm"

type Article struct {
	gorm.Model
}

func AutoMigrate() {

}
