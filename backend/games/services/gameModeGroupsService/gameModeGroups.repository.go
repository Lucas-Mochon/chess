package gameModeGroupsService

import (
	"chesscom-copy/backend/db/models"
	dto "chesscom-copy/backend/games/dto/game_mode_groups"
	"chesscom-copy/backend/games/repository/gameModeGroupsRepository"
)

type GameModeGroupsService struct {
	Repo *gameModeGroupsRepository.GameModeGroupsRepository
}

func (s *GameModeGroupsService) List() ([]models.GameModeGroup, error) {
	return s.Repo.List()
}

func (s *GameModeGroupsService) Create(gameModeGroups dto.CreateGameModeGroupsDTO) error {
	return s.Repo.Create(gameModeGroups)
}
