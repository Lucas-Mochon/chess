package models

import "time"

type GameReports struct {
	Id         string    `db:"id"`
	GameId     int       `db:"game_id"`
	ReporterId int       `db:"reporter_id"`
	Reason     string    `db:"reason"`
	ReportedAt time.Time `db:"reported_at"`
}
