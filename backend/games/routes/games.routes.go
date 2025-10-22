package gamesRoutes

import (
	"chesscom-copy/backend/games/controllers/gameModeGroupsController"
	"chesscom-copy/backend/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func RegisterGamesRoutes(rg *gin.RouterGroup,
	controllerGameModeGroups *gameModeGroupsController.GameModeGroupsController) {

	GamesGroup := rg.Group("/games")
	{
		GamesModes := GamesGroup.Group("/modes")
		{
			GameModeGroups := GamesModes.Group("/groups")
			{
				GameModeGroups.GET("/", middlewares.JWTMiddleware(), controllerGameModeGroups.List)
				GameModeGroups.POST("/create", middlewares.JWTMiddleware(), controllerGameModeGroups.Create)
			}
		}
	}
}
