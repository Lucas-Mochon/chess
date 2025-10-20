package models

type Tournament struct {
	Id      string `db:"id"`
	RoundId int    `db:"round_id"`
	GameId  int    `db:"game_id"`
}
