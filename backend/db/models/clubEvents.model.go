package models

import "time"

type ClubEvents struct {
	Id          string    `db:"id"`
	ClubId      int       `db:"club_id"`
	Name        string    `db:"name"`
	Description string    `db:"description"`
	EventDate   time.Time `db:"event_date"`
}
