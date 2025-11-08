package usersRoutes

import (
	"chesscom-copy/backend/internal/common/middlewares"
	usersController "chesscom-copy/backend/internal/models/users/controllers/users"

	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(rg *gin.RouterGroup, uc *usersController.UserController) {
	userGroup := rg.Group("/users")
	{
		userGroup.GET("/", middlewares.JWTMiddleware(), uc.List)
		userGroup.GET("/:id", middlewares.JWTMiddleware(), uc.GetById)
		userGroup.POST("/register", uc.Register)
		userGroup.POST("/login", uc.Login)
		userGroup.PUT("/:id", middlewares.JWTMiddleware(), uc.Edit)
	}
}
