package models

import "time"

type UserProfiles struct {
	Id          string    `db:"id"`
	UserId      int       `db:"user_id"`
	Bio         string    `db:"bio"`
	Country     string    `db:"country"`
	Preferences []byte    `db:"preferences"`
	CreatedAt   time.Time `db:"created_at"`
	UpdatedAt   time.Time `db:"updated_at"`
}
