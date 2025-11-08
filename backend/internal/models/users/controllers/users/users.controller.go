package usersController

import (
	usersDto "chesscom-copy/backend/internal/models/users/dto/users"
	usersService "chesscom-copy/backend/internal/models/users/services/users"
	"net/http"
	"strconv"

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

func (controller *UserController) GetById(context *gin.Context) {
	idParam := context.Param("id")
	userId, err := strconv.Atoi(idParam)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "ID utilisateur invalide"})
		return
	}

	user, err := controller.Service.GetById(userId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	context.JSON(http.StatusOK, gin.H{"user": user})
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

func (c *UserController) Edit(ctx *gin.Context) {
	idParam := ctx.Param("id")
	userID, err := strconv.Atoi(idParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "ID utilisateur invalide"})
		return
	}

	var editDto usersDto.EditUsersDTO
	if err := ctx.ShouldBindJSON(&editDto); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.Edit(userID, editDto); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Utilisateur mis à jour avec succès"})
}
