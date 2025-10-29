package gameMovesService

import (
	"chesscom-copy/backend/db/models"
	gameMovesDto "chesscom-copy/backend/internal/models/games/dto/game_moves"
	"chesscom-copy/backend/internal/models/games/repository/gameMovesRepository"
)

type GameMovesService struct {
	Repo *gameMovesRepository.GameMovesRepository
}

func (service *GameMovesService) ListByGame(gameId int) ([]models.GameMoves, error) {
	return service.Repo.ListByGame(gameId)
}

func (service *GameMovesService) Create(gameMove gameMovesDto.CreateGameMovesDto) error {
	return service.Repo.Create(gameMove)
}
