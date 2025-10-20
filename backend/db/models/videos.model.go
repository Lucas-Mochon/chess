package models

import "time"

type Videos struct {
	Id         string    `db:"id"`
	Title      string    `db:"title"`
	Url        string    `db:"url"`
	UploadedBy int       `db:"uploaded_by"`
	UploadedAt time.Time `db:"uploaded_at"`
}
