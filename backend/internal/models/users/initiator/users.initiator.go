package usersInitiator

import (
	"chesscom-copy/backend/internal/models/games/repository/gameModesRepository"
	userStatsController "chesscom-copy/backend/internal/models/users/controllers/userStats"
	usersController "chesscom-copy/backend/internal/models/users/controllers/users"
	userStatsRepository "chesscom-copy/backend/internal/models/users/repository/userStats"
	usersRepository "chesscom-copy/backend/internal/models/users/repository/users"
	userStatsService "chesscom-copy/backend/internal/models/users/services/userStats"
	usersService "chesscom-copy/backend/internal/models/users/services/users"

	"database/sql"
)

type UsersControllers struct {
	UserController     *usersController.UserController
	UserStatController *userStatsController.UserStatsController
}

func InitControllers(db *sql.DB) *UsersControllers {
	//OTHERS DEPENDENCIES
	gameModeRepo := &gameModesRepository.GameModesRepository{DB: db}

	//USERS
	userRepo := &usersRepository.UserRepository{DB: db}
	userStatsRepo := &userStatsRepository.UserStatsRepository{DB: db, GameModeRepo: gameModeRepo}
	userService := &usersService.UserService{Repo: userRepo, UserStatsRepository: userStatsRepo}
	userController := &usersController.UserController{Service: userService}

	//USERSTATS
	userStatsService := &userStatsService.UserStatsService{UserStatsRepository: userStatsRepo}
	userStatsController := &userStatsController.UserStatsController{UserStatsService: userStatsService}

	return &UsersControllers{
		UserController:     userController,
		UserStatController: userStatsController,
	}
}
