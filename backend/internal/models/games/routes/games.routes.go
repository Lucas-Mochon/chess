package gamesRoutes

import (
	"chesscom-copy/backend/internal/common/middlewares"
	"chesscom-copy/backend/internal/models/games/controllers/gameModeGroupsController"
	"chesscom-copy/backend/internal/models/games/controllers/gameModesController.go"
	gameMovesController "chesscom-copy/backend/internal/models/games/controllers/gameMoves"
	gamesController "chesscom-copy/backend/internal/models/games/controllers/games"

	"github.com/gin-gonic/gin"
)

func RegisterGamesRoutes(rg *gin.RouterGroup,
	controllerGames *gamesController.GamesController,
	controllerGameMoves *gameMovesController.GameMovesController,
	controllerGameModes *gameModesController.GameModesController,
	controllerGameModeGroups *gameModeGroupsController.GameModeGroupsController) {

	GamesGroup := rg.Group("/games")
	{

		GamesGroup.GET("/list/:userId", controllerGames.ListMe)
		GamesGroup.GET("/get/:gameId", controllerGames.GetById)
		GamesGroup.POST("/create", controllerGames.Create)
		GamesGroup.PUT("/finish", controllerGames.Finish)

		GameMoves := GamesGroup.Group("/moves")
		{
			GameMoves.GET("/list/:gameId", middlewares.JWTMiddleware(), controllerGameMoves.ListByGame)
			GameMoves.POST("/create", middlewares.JWTMiddleware(), controllerGameMoves.Create)
		}

		GamesModes := GamesGroup.Group("/modes")
		{

			GamesModes.GET("/", middlewares.JWTMiddleware(), controllerGameModes.List)
			GamesModes.POST("/create", middlewares.JWTMiddleware(), controllerGameModes.Create)

			GameModeGroups := GamesModes.Group("/groups")
			{
				GameModeGroups.GET("/", middlewares.JWTMiddleware(), controllerGameModeGroups.List)
				GameModeGroups.POST("/create", middlewares.JWTMiddleware(), controllerGameModeGroups.Create)
			}
		}
	}
}
