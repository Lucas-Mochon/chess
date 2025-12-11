package gamesInitiator

import (
	"chesscom-copy/backend/internal/models/games/controllers/gameModeGroupsController"
	"chesscom-copy/backend/internal/models/games/controllers/gameModesController.go"
	gameMovesController "chesscom-copy/backend/internal/models/games/controllers/gameMoves"
	gamesController "chesscom-copy/backend/internal/models/games/controllers/games"
	matchmakingController "chesscom-copy/backend/internal/models/games/controllers/matchmaking"
	"chesscom-copy/backend/internal/models/games/repository/gameModeGroupsRepository"
	"chesscom-copy/backend/internal/models/games/repository/gameModesRepository"
	"chesscom-copy/backend/internal/models/games/repository/gameMovesRepository"
	gamesRepository "chesscom-copy/backend/internal/models/games/repository/games"
	mathchmakingRepository "chesscom-copy/backend/internal/models/games/repository/matchmaking"
	"chesscom-copy/backend/internal/models/games/services/gameModeGroupsService"
	"chesscom-copy/backend/internal/models/games/services/gameModesService"
	gameMovesService "chesscom-copy/backend/internal/models/games/services/gameMoves"
	gamesService "chesscom-copy/backend/internal/models/games/services/games"
	mathchmakingService "chesscom-copy/backend/internal/models/games/services/matchmaking"

	"database/sql"
)

type GamesControllers struct {
	GamesControllers        *gamesController.GamesController
	GameMovesController     *gameMovesController.GameMovesController
	GameModeGroupController *gameModeGroupsController.GameModeGroupsController
	GameModeController      *gameModesController.GameModesController
	MatchmakingController   *matchmakingController.MatchmakingController
}

func InitControllers(db *sql.DB) *GamesControllers {
	//COMMON
	gameModeRepo := &gameModesRepository.GameModesRepository{DB: db}

	//GAMES
	gamesRepo := &gamesRepository.GamesRepository{DB: db}
	gamesService := &gamesService.GamesService{Repo: gamesRepo, GameModesRepo: gameModeRepo}
	gamesController := &gamesController.GamesController{Service: gamesService}

	//GAMEMOVES
	gameMovesRepo := &gameMovesRepository.GameMovesRepository{DB: db}
	gameMovesService := &gameMovesService.GameMovesService{Repo: gameMovesRepo}
	gameMovesController := &gameMovesController.GameMovesController{Service: gameMovesService}

	//GAMEMODES
	gameModeService := &gameModesService.GameModesService{Repo: gameModeRepo}
	gameModeController := &gameModesController.GameModesController{Service: gameModeService}

	//GAMEMODEGROUPS
	gameModeGroupRepo := &gameModeGroupsRepository.GameModeGroupsRepository{DB: db}
	gameModeGroupService := &gameModeGroupsService.GameModeGroupsService{Repo: gameModeGroupRepo}
	gameModeGroupController := &gameModeGroupsController.GameModeGroupsController{Service: gameModeGroupService}

	//MATCHMAKING
	matchmakingRepo := &mathchmakingRepository.MatchmakingRepository{DB: db}
	matchmakingService := &mathchmakingService.MatchmakingService{Repo: matchmakingRepo}
	matchmakingController := &matchmakingController.MatchmakingController{Service: matchmakingService}

	return &GamesControllers{
		GamesControllers:        gamesController,
		GameMovesController:     gameMovesController,
		GameModeController:      gameModeController,
		GameModeGroupController: gameModeGroupController,
		MatchmakingController:   matchmakingController,
	}
}
