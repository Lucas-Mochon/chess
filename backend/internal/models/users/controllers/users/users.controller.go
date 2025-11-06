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
	ctx.JSON(http.StatusOK, gin.H{"users": users})
}

func (c *UserController) Register(ctx *gin.Context) {
	var input usersDto.CreateUsersDTO
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userModel, err := c.Service.Register(input)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"message": "Utilisateur créé avec succès",
		"user":    userModel,
	})
}

func (c *UserController) Login(ctx *gin.Context) {
	var loginDTO usersDto.UsersLoginDTO
	if err := ctx.ShouldBindJSON(&loginDTO); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, data, err := c.Service.Login(loginDTO)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": data, "token": token})
}
