package initiator

import (
	"chesscom-copy/backend/internal/models/games/controllers/gameModeGroupsController"
	"chesscom-copy/backend/internal/models/games/controllers/gameModesController.go"
	"chesscom-copy/backend/internal/models/games/repository/gameModeGroupsRepository"
	"chesscom-copy/backend/internal/models/games/repository/gameModesRepository"
	"chesscom-copy/backend/internal/models/games/services/gameModeGroupsService"
	"chesscom-copy/backend/internal/models/games/services/gameModesService"
	usersController "chesscom-copy/backend/internal/models/users/controllers/users"
	usersRepository "chesscom-copy/backend/internal/models/users/repository/users"
	usersService "chesscom-copy/backend/internal/models/users/services/users"

	"database/sql"
)

type Controllers struct {
	UserController          *usersController.UserController
	GameModeGroupController *gameModeGroupsController.GameModeGroupsController
	GameModeController      *gameModesController.GameModesController
}

func InitControllers(db *sql.DB) *Controllers {
	//USERS
	userRepo := &usersRepository.UserRepository{DB: db}
	userService := &usersService.UserService{Repo: userRepo}
	userController := &usersController.UserController{Service: userService}

	//GAMEMODES
	gameModeRepo := &gameModesRepository.GameModeGroupsRepository{DB: db}
	gameModeService := &gameModesService.GameModesService{Repo: gameModeRepo}
	gameModeController := &gameModesController.GameModesController{Service: gameModeService}

	//GAMEMODEGROUPS
	gameModeGroupRepo := &gameModeGroupsRepository.GameModeGroupsRepository{DB: db}
	gameModeGroupService := &gameModeGroupsService.GameModeGroupsService{Repo: gameModeGroupRepo}
	gameModeGroupController := &gameModeGroupsController.GameModeGroupsController{Service: gameModeGroupService}

	return &Controllers{
		UserController:          userController,
		GameModeController:      gameModeController,
		GameModeGroupController: gameModeGroupController,
	}
}
