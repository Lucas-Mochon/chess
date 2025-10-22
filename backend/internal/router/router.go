package router

import (
	gamesRoutes "chesscom-copy/backend/games/routes"
	"chesscom-copy/backend/internal/initiator"
	"chesscom-copy/backend/internal/pages"
	usersRoutes "chesscom-copy/backend/users/routes"

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

		// Utilise le contrôleur instancié dans initiator
		usersRoutes.RegisterUserRoutes(api, controllers.UserController)
		gamesRoutes.RegisterGamesRoutes(api, controllers.GameModeGroupController)

	}

	return r
}
