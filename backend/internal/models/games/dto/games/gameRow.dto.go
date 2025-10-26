package gamesDto

import (
	"time"
)

type GameRow struct {
	Id              int
	WhitePlayerId   int
	WhitePlayerName string
	BlackPlayerId   int
	BlackPlayerName string
	Result          *string
	DurationSeconds *int
	StartedAt       time.Time
	EndedAt         *time.Time
}
