package models

import "time"

type AuditLogs struct {
	Id       string    `db:"id"`
	UserId   int       `db:"user_id"`
	Action   string    `db:"action"`
	Details  string    `db:"details"`
	LoggedAt time.Time `db:"logged_at"`
}
