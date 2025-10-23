package usersController

import (
	usersDto "chesscom-copy/backend/internal/models/users/dto/users"
	usersService "chesscom-copy/backend/internal/models/users/services/users"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	Service *usersService.UserService
}

func (c *UserController) List(ctx *gin.Context) {
	users, err := c.Service.List()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, users)
}

func (uc *UserController) Register(ctx *gin.Context) {
	var input usersDto.CreateUsersDTO
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := uc.Service.Register(input); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Utilisateur créé avec succès"})
}

func (ctrl *UserController) Login(c *gin.Context) {
	var loginDTO usersDto.UsersLoginDTO
	if err := c.ShouldBindJSON(&loginDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, err := ctrl.Service.Login(loginDTO)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
