package models

type GameTime struct {
	Id          string `db:"id"`
	GameId      int    `db:"game_id"`
	TimeControl string `db:"time_control"`
}
