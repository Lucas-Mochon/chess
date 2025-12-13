package gamesService

import (
	"chesscom-copy/backend/db/models"
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

func (service *GamesService) Create(game gamesDto.CreateGamesDTO) (models.Games, error) {
	gameMode, err := service.GameModesRepo.GetOne(game.GameModeId)
	if err != nil {
		return models.Games{}, err
	}
	game.DurationSeconds = gameMode.Time * 2
	return service.Repo.Create(game)
}

func (service *GamesService) Finish(game gamesDto.FinishGamesDto) error {
	return service.Repo.Finish(game)
}

func (service *GamesService) UpdateTimes(gameId int, blackTime int, whiteTime int) error {
	return service.Repo.UpdateTimes(gameId, blackTime, whiteTime)
}
