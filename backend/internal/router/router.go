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
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
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
			controllers.Games.GameModeController,
			controllers.Games.GameModeGroupController,
		)

	}

	return r
}
