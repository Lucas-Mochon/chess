package models

import "time"

type Puzzles struct {
	Id         string    `db:"id"`
	Title      string    `db:"title"`
	Fen        string    `db:"fen"`
	Solution   string    `db:"solution"`
	Difficulty int       `db:"difficulty"`
	CreatedAt  time.Time `db:"created_at"`
}
