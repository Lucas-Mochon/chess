package gamesDto

type UpdateTimesDto struct {
	GameId    int `json:"gameId" binding:"required"`
	BlackTime int `json:"blackTime" binding:"required"`
	WhiteTime int `json:"whiteTime" binding:"required"`
}
