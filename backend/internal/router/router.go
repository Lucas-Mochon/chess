package router

import (
	"chesscom-copy/backend/internal/common/initiator"
	gamesRoutes "chesscom-copy/backend/internal/models/games/routes"
	usersRoutes "chesscom-copy/backend/internal/models/users/routes"
	"chesscom-copy/backend/internal/pages"

	"github.com/gin-gonic/gin"
)

func SetupRouter(controllers *initiator.Controllers) *gin.Engine {
	r := gin.Default()

	// Middleware CORS
	r.Use(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		if origin == "http://localhost:3000" || origin == "http://localhost:3001" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		}

		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Bearer")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	api := r.Group("/api")
	{
		api.GET("/home", pages.HomePage)

		usersRoutes.RegisterUserRoutes(
			api,
			controllers.Users.UserController,
		)

		gamesRoutes.RegisterGamesRoutes(
			api,
			controllers.Games.GamesControllers,
			controllers.Games.GameMovesController,
			controllers.Games.GameModeController,
			controllers.Games.GameModeGroupController,
			controllers.Games.MatchmakingController,
		)

	}

	return r
}
