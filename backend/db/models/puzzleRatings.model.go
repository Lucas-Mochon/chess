package models

import "time"

type PuzzleRatings struct {
	Id       string    `db:"id"`
	PuzzleId int       `db:"puzzle_id"`
	Rating   int       `db:"rating"`
	RatedBy  int       `db:"rated_by"`
	RatedAt  time.Time `db:"rated_at"`
}
