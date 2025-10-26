package gamesDto

type FinishGamesDto struct {
	Id              int    `json:"id" binding:"required"`
	Result          string `json:"result" binding:"required"`
	DurationSeconds int    `json:"duration_seconds" binding:"required"`
}
