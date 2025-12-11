package models

import "time"

type Games struct {
	Id              int       `db:"id"`
	WhitePlayerId   int       `db:"white_player_id"`
	BlackPlayerId   int       `db:"black_player_id"`
	Result          string    `db:"result"`
	DurationSeconds int       `db:"duration_seconds"`
	StartedAt       time.Time `db:"started_at"`
	EndedAt         time.Time `db:"ended_at"`
	GameModeId      int       `db:"game_mode_id"`
}
