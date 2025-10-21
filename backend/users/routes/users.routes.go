package routes

import (
	// "chesscom-copy/backend/internal/middlewares"
	controller "chesscom-copy/backend/users/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(rg *gin.RouterGroup, uc *controller.UserController) {
	userGroup := rg.Group("/users")
	{
		// userGroup.GET("/", middlewares.JWTMiddleware(), uc.List)
		userGroup.GET("/", uc.List)
		userGroup.POST("/register", uc.Register)
		userGroup.POST("/login", uc.Login)
	}
}
