package gamesInitiator

import (
	"chesscom-copy/backend/internal/models/games/controllers/gameModeGroupsController"
	"chesscom-copy/backend/internal/models/games/controllers/gameModesController.go"
	gamesController "chesscom-copy/backend/internal/models/games/controllers/games"
	"chesscom-copy/backend/internal/models/games/repository/gameModeGroupsRepository"
	"chesscom-copy/backend/internal/models/games/repository/gameModesRepository"
	gamesRepository "chesscom-copy/backend/internal/models/games/repository/games"
	"chesscom-copy/backend/internal/models/games/services/gameModeGroupsService"
	"chesscom-copy/backend/internal/models/games/services/gameModesService"
	gamesService "chesscom-copy/backend/internal/models/games/services/games"

	"database/sql"
)

type GamesControllers struct {
	GamesControllers        *gamesController.GamesController
	GameModeGroupController *gameModeGroupsController.GameModeGroupsController
	GameModeController      *gameModesController.GameModesController
}

func InitControllers(db *sql.DB) *GamesControllers {
	//COMMON
	gameModeRepo := &gameModesRepository.GameModesRepository{DB: db}

	//GAMES
	gamesRepo := &gamesRepository.GamesRepository{DB: db}
	gamesService := &gamesService.GamesService{Repo: gamesRepo, GameModesRepo: gameModeRepo}
	gamesController := &gamesController.GamesController{Service: gamesService}

	//GAMEMODES
	gameModeService := &gameModesService.GameModesService{Repo: gameModeRepo}
	gameModeController := &gameModesController.GameModesController{Service: gameModeService}

	//GAMEMODEGROUPS
	gameModeGroupRepo := &gameModeGroupsRepository.GameModeGroupsRepository{DB: db}
	gameModeGroupService := &gameModeGroupsService.GameModeGroupsService{Repo: gameModeGroupRepo}
	gameModeGroupController := &gameModeGroupsController.GameModeGroupsController{Service: gameModeGroupService}

	return &GamesControllers{
		GamesControllers:        gamesController,
		GameModeController:      gameModeController,
		GameModeGroupController: gameModeGroupController,
	}
}
