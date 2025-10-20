package models

import "time"

type VideoComments struct {
	Id          string    `db:"id"`
	VideoId     int       `db:"video_id"`
	UserId      int       `db:"user_id"`
	Comment     string    `db:"comment"`
	CommentedAt time.Time `db:"commented_at"`
}
