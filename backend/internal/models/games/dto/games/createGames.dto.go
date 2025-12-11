package gamesDto

type CreateGamesDTO struct {
	WhitePlayerId   int    `json:"white_player_id" binding:"required"`
	BlackPlayerId   int    `json:"black_player_id" binding:"required"`
	GameModeId      int    `json:"game_mode_id" binding:"required"`
	Result          string `json:"result" binding:"required"`
	DurationSeconds int    `json:"duration_seconds" binding:"required"`
}
