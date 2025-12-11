package mathchmakingService

import (
	"chesscom-copy/backend/db/models"
	gamesDto "chesscom-copy/backend/internal/models/games/dto/games"
	gamesRepository "chesscom-copy/backend/internal/models/games/repository/games"
	mathchmakingRepository "chesscom-copy/backend/internal/models/games/repository/matchmaking"
	"math/rand"
)

type MatchmakingService struct {
	Repo      *mathchmakingRepository.MatchmakingRepository
	gamesRepo *gamesRepository.GamesRepository
}

func (service *MatchmakingService) JoinQueue(player models.Users, gameModeId int) (gamesDto.GameInformationResponse, error) {
	service.Repo.AddPlayerToQueue(player)

	p1, p2, ok := service.Repo.PopTwoPlayers()
	if !ok {
		return gamesDto.GameInformationResponse{}, nil
	}

	var game gamesDto.CreateGamesDTO

	if rand.Intn(2) == 0 {
		game = gamesDto.CreateGamesDTO{
			WhitePlayerId:   p1.Id,
			BlackPlayerId:   p2.Id,
			GameModeId:      gameModeId,
			Result:          "playing",
			DurationSeconds: 0,
		}
	} else {
		game = gamesDto.CreateGamesDTO{
			WhitePlayerId:   p2.Id,
			BlackPlayerId:   p1.Id,
			GameModeId:      gameModeId,
			Result:          "playing",
			DurationSeconds: 0,
		}
	}

	createdGame, err := service.gamesRepo.Create(game)
	if err != nil {
		return gamesDto.GameInformationResponse{}, err
	}

	id := createdGame.Id

	gameInfo, err := service.gamesRepo.GetOneGame(id)
	if err != nil {
		return gamesDto.GameInformationResponse{}, err
	}

	return gameInfo, nil
}
