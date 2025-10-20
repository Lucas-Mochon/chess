package models

import "time"

type Reports struct {
	Id             string    `db:"id"`
	ReporterId     int       `db:"reporter_id"`
	ReportedUserId int       `db:"reported_user_id"`
	Reason         string    `db:"reason"`
	ReportedAt     time.Time `db:"reported_at"`
}
