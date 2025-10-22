package models

type GameMode struct {
	ID               int    `db:"id"`
	GameID           int    `db:"game_id"`
	GameModeGroupsID int    `db:"game_mode_groups_id"`
	Name             string `db:"name"`
	Description      string `db:"description"`
}
