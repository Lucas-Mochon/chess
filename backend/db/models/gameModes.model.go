package models

type GameMode struct {
	ID               int    `db:"id"`
	GameModeGroupsID int    `db:"game_mode_groups_id"`
	Name             string `db:"name"`
	Description      string `db:"description"`
	DefaultStats     int    `db:"default_stats"`
}
