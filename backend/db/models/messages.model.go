package models

import "time"

type Messages struct {
	Id         string    `db:"id"`
	SenderId   int       `db:"sender_id"`
	ReceiverId int       `db:"receiver_id"`
	Content    string    `db:"content"`
	SentAt     time.Time `db:"sent_at"`
}
