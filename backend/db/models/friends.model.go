package models

import "time"

type Friends struct {
	Id        string    `db:"id"`
	UserId    int       `db:"user_id"`
	FriendId  int       `db:"friend_id"`
	Status    string    `db:"status"`
	CreatedAt time.Time `db:"created_at"`
}
