package models

import "time"

type UserDevices struct {
	Id          string    `db:"id"`
	UserId      int       `db:"user_id"`
	DeviceToken string    `db:"device_token"`
	DeviceType  string    `db:"device_type"`
	LastActive  time.Time `db:"last_active"`
	CreatedAt   time.Time `db:"created_at"`
}
