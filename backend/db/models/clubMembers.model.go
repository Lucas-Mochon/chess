package models

import "time"

type ClubMembers struct {
	Id       string    `db:"id"`
	ClubId   int       `db:"club_id"`
	UserId   int       `db:"user_id"`
	JoinedAt time.Time `db:"joined_at"`
}
