package initiator

import (
	gamesInitiator "chesscom-copy/backend/internal/models/games/initiator"
	usersInitiator "chesscom-copy/backend/internal/models/users/initiator"
	"database/sql"
)

type Controllers struct {
	Users *usersInitiator.UsersControllers
	Games *gamesInitiator.GamesControllers
}

func InitControllers(db *sql.DB) *Controllers {
	usersController := usersInitiator.InitControllers(db)
	gamesController := gamesInitiator.InitControllers(db)

	return &Controllers{
		Users: usersController,
		Games: gamesController,
	}
}
