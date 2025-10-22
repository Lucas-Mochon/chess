package models

import "time"

type UserStats struct {
	Id          string    `db:"id"`
	UserId      int       `db:"user_id"`
	GameModesId int       `db;game_modes_id`
	Rating      int       `db:"rating"`
	GamesPlayed int       `db:"games_played"`
	Wins        int       `db:"wins"`
	Losses      int       `db:"losses"`
	Draws       int       `db:"draws"`
	CreatedAt   time.Time `db:"created_at"`
	UpdatedAt   time.Time `db:"updated_at"`
}
