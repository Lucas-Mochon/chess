package gamesService

import (
	gamesDto "chesscom-copy/backend/internal/models/games/dto/games"
	"chesscom-copy/backend/internal/models/games/repository/gameModesRepository"
	gamesRepository "chesscom-copy/backend/internal/models/games/repository/games"
)

type GamesService struct {
	Repo          *gamesRepository.GamesRepository
	GameModesRepo *gameModesRepository.GameModesRepository
}

func (service *GamesService) ListMe(userId int) ([]gamesDto.GameRow, error) {
	return service.Repo.ListMe(userId)
}

func (service *GamesService) GetById(gameId int) (gamesDto.GameRow, error) {
	return service.Repo.GetById(gameId)
}

func (service *GamesService) Create(game gamesDto.CreateGamesDTO) error {
	return service.Repo.Create(game)
}

func (service *GamesService) Finish(game gamesDto.FinishGamesDto) error {
	return service.Repo.Finish(game)
}
