package models

import "time"

type Subscriptions struct {
	Id        string    `db:"id"`
	UserId    int       `db:"user_id"`
	Plan      string    `db:"plan"`
	StartDate time.Time `db:"start_date"`
	EndDate   time.Time `db:"end_date"`
	Status    string    `db:"status"`
}
