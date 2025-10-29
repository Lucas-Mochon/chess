package gameMovesDto

type CreateGameMovesDto struct {
	GameId     int    `json:"gameId" binding:"required"`
	MoveNumber int    `json:"moveNumber" binding:"required"`
	Notation   string `json:"notation" binding:"required"`
}
