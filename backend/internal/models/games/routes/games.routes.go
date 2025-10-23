package gamesRoutes

import (
	"chesscom-copy/backend/internal/common/middlewares"
	"chesscom-copy/backend/internal/models/games/controllers/gameModeGroupsController"
	"chesscom-copy/backend/internal/models/games/controllers/gameModesController.go"

	"github.com/gin-gonic/gin"
)

func RegisterGamesRoutes(rg *gin.RouterGroup,
	controllerGameModes *gameModesController.GameModesController,
	controllerGameModeGroups *gameModeGroupsController.GameModeGroupsController) {

	GamesGroup := rg.Group("/games")
	{
		GamesModes := GamesGroup.Group("/modes")
		{

			GamesModes.GET("/", controllerGameModes.List)
			GamesModes.POST("/create", controllerGameModes.Create)

			GameModeGroups := GamesModes.Group("/groups")
			{
				GameModeGroups.GET("/", middlewares.JWTMiddleware(), controllerGameModeGroups.List)
				GameModeGroups.POST("/create", middlewares.JWTMiddleware(), controllerGameModeGroups.Create)
			}
		}
	}
}
