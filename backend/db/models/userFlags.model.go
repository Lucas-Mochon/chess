package models

import "time"

type UserFlags struct {
	Id        string    `db:"id"`
	UserId    int       `db:"user_id"`
	FlagType  string    `db:"flag_type"`
	FlaggedAt time.Time `db:"flagged_at"`
}
