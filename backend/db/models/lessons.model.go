package models

import "time"

type Lessons struct {
	Id          string    `db:"id"`
	Title       string    `db:"title"`
	Description string    `db:"description"`
	CreatedBy   int       `db:"created_by"`
	CreatedAt   time.Time `db:"created_at"`
}
