package initiator

import (
	"chesscom-copy/backend/games/controllers/gameModeGroupsController"
	"chesscom-copy/backend/games/repository/gameModeGroupsRepository"
	"chesscom-copy/backend/games/services/gameModeGroupsService"
	usersController "chesscom-copy/backend/users/controllers/users"
	usersRepository "chesscom-copy/backend/users/repository/users"
	usersService "chesscom-copy/backend/users/services/users"

	"database/sql"
)

type Controllers struct {
	UserController          *usersController.UserController
	GameModeGroupController *gameModeGroupsController.GameModeGroupsController
}

func InitControllers(db *sql.DB) *Controllers {
	//USERS
	userRepo := &usersRepository.UserRepository{DB: db}
	userService := &usersService.UserService{Repo: userRepo}
	userController := &usersController.UserController{Service: userService}

	//GAMEMODEGROUPS
	gameModeGroupRepo := &gameModeGroupsRepository.GameModeGroupsRepository{DB: db}
	gameModeGroupService := &gameModeGroupsService.GameModeGroupsService{Repo: gameModeGroupRepo}
	gameModeGroupController := &gameModeGroupsController.GameModeGroupsController{Service: gameModeGroupService}

	return &Controllers{
		UserController:          userController,
		GameModeGroupController: gameModeGroupController,
	}
}
