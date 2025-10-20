package models

import "time"

type Bans struct {
	Id        string    `db:"id"`
	UserId    int       `db:"user_id"`
	Reason    string    `db:"reason"`
	BannedAt  time.Time `db:"banned_at"`
	ExpiresAt time.Time `db:"expires_at"`
}
