package gameModesService

import (
	"chesscom-copy/backend/db/models"
	gameModesDto "chesscom-copy/backend/internal/models/games/dto/game_modes"
	"chesscom-copy/backend/internal/models/games/repository/gameModesRepository"
)

type GameModesService struct {
	Repo *gameModesRepository.GameModesRepository
}

func (s *GameModesService) List() ([]models.GameMode, error) {
	return s.Repo.List()
}

func (s *GameModesService) Create(gameMode gameModesDto.CreateGameModesDTO) error {
	return s.Repo.Create(gameMode)
}
