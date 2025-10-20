package models

import "time"

type UserLessonProgress struct {
	Id          string    `db:"id"`
	UserId      int       `db:"user_id"`
	LessonId    int       `db:"lesson_id"`
	Completed   bool      `db:"completed"`
	CompletedAt time.Time `db:"completed_at"`
}
