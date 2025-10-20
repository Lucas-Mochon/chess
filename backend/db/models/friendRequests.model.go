package models

import "time"

type FriendRequests struct {
	Id         string    `db:"id"`
	SenderId   int       `db:"sender_id"`
	ReceiverId int       `db:"receiver_id"`
	Status     string    `db:"status"`
	SentAt     time.Time `db:"sent_at"`
}
