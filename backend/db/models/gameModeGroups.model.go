package models

type GameModeGroup struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"size:64"`
	Logo []byte
}
