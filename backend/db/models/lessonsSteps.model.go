package models

type LessonSteps struct {
	Id         string `db:"id"`
	LessonId   int    `db:"lesson_id"`
	StepNumber int    `db:"step_number"`
	Content    string `db:"content"`
}
