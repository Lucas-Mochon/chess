package models

import "time"

type TournamentRounds struct {
	Id           string    `db:"id"`
	TournamentId int       `db:"tournament_id"`
	RoundNumber  int       `db:"round_number"`
	CreatedAt    time.Time `db:"created_at"`
}
