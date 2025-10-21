package initiator

import (
	controller "chesscom-copy/backend/users/controllers"
	"chesscom-copy/backend/users/repository"
	service "chesscom-copy/backend/users/services"
	"database/sql"
)

type Controllers struct {
	UserController *controller.UserController
}

func InitControllers(db *sql.DB) *Controllers {
	userRepo := &repository.UserRepository{DB: db}
	userService := &service.UserService{Repo: userRepo}
	userController := &controller.UserController{Service: userService}

	return &Controllers{
		UserController: userController,
	}
}
