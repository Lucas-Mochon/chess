package usersRoutes

import (
	// "chesscom-copy/backend/internal/middlewares"

	usersController "chesscom-copy/backend/internal/models/users/controllers/users"

	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(rg *gin.RouterGroup, uc *usersController.UserController) {
	userGroup := rg.Group("/users")
	{
		// userGroup.GET("/", middlewares.JWTMiddleware(), uc.List)
		userGroup.GET("/", uc.List)
		userGroup.POST("/register", uc.Register)
		userGroup.POST("/login", uc.Login)
	}
}
