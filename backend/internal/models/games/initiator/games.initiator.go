package gamesInitiator

import (
	"chesscom-copy/backend/internal/models/games/controllers/gameModeGroupsController"
	"chesscom-copy/backend/internal/models/games/controllers/gameModesController.go"
	"chesscom-copy/backend/internal/models/games/repository/gameModeGroupsRepository"
	"chesscom-copy/backend/internal/models/games/repository/gameModesRepository"
	"chesscom-copy/backend/internal/models/games/services/gameModeGroupsService"
	"chesscom-copy/backend/internal/models/games/services/gameModesService"

	"database/sql"
)

type GamesControllers struct {
	GameModeGroupController *gameModeGroupsController.GameModeGroupsController
	GameModeController      *gameModesController.GameModesController
}

func InitControllers(db *sql.DB) *GamesControllers {
	//GAMEMODES
	gameModeRepo := &gameModesRepository.GameModesRepository{DB: db}
	gameModeService := &gameModesService.GameModesService{Repo: gameModeRepo}
	gameModeController := &gameModesController.GameModesController{Service: gameModeService}

	//GAMEMODEGROUPS
	gameModeGroupRepo := &gameModeGroupsRepository.GameModeGroupsRepository{DB: db}
	gameModeGroupService := &gameModeGroupsService.GameModeGroupsService{Repo: gameModeGroupRepo}
	gameModeGroupController := &gameModeGroupsController.GameModeGroupsController{Service: gameModeGroupService}

	return &GamesControllers{
		GameModeController:      gameModeController,
		GameModeGroupController: gameModeGroupController,
	}
}
