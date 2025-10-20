package models

import "time"

type Clubs struct {
	Id          string    `db:"id"`
	Name        string    `db:"name"`
	Description string    `db:"description"`
	OwnerId     int       `db:"owner_id"`
	CreatedAt   time.Time `db:"created_at"`
}
