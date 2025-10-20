package models

type Puzzle struct {
	Id       string `db:"id"`
	PuzzleId int    `db:"puzzle_id"`
	Tag      string `db:"tag"`
}
