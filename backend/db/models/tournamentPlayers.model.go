package models

import "time"

type TournamentPlayers struct {
	Id           string    `db:"id"`
	TournamentId int       `db:"tournament_id"`
	UserId       int       `db:"user_id"`
	JoinedAt     time.Time `db:"joined_at"`
}
