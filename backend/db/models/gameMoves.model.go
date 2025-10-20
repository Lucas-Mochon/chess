package models

import "time"

type GameMoves struct {
	Id         string    `db:"id"`
	GameId     int       `db:"game_id"`
	MoveNumber int       `db:"move_number"`
	Notation   string    `db:"notation"`
	Timestamp  time.Time `db:"timestamp"`
}
