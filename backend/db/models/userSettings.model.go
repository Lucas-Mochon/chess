package models

import "time"

type UserSettings struct {
	Id                   string    `db:"id"`
	UserId               int       `db:"user_id"`
	Theme                string    `db:"theme"`
	NotificationsEnabled bool      `db:"notifications_enabled"`
	Language             string    `db:"language"`
	CreatedAt            time.Time `db:"created_at"`
	UpdatedAt            time.Time `db:"updated_at"`
}
