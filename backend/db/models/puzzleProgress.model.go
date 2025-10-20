package models

import "time"

type PuzzleProgress struct {
	Id            string    `db:"id"`
	UserId        int       `db:"user_id"`
	PuzzleId      int       `db:"puzzle_id"`
	Solved        bool      `db:"solved"`
	Attempts      int       `db:"attempts"`
	LastAttemptAt time.Time `db:"last_attempt_at"`
}
