package models

import "time"

type Game struct {
	Id       string    `db:"id"`
	GameId   int       `db:"game_id"`
	SenderId int       `db:"sender_id"`
	Message  string    `db:"message"`
	SentAt   time.Time `db:"sent_at"`
}
