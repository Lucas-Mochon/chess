package gamesController

import (
	gamesDto "chesscom-copy/backend/internal/models/games/dto/games"
	gamesService "chesscom-copy/backend/internal/models/games/services/games"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type GamesController struct {
	Service *gamesService.GamesService
}

func (controller *GamesController) ListMe(context *gin.Context) {
	userIdStr := context.Param("userId")
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	games, err := controller.Service.ListMe(userId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, games)
}

func (controller *GamesController) GetById(context *gin.Context) {
	gameIdStr := context.Param("gameId")
	gameId, err := strconv.Atoi(gameIdStr)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid game ID"})
		return
	}

	game, err := controller.Service.GetById(gameId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, game)
}

func (controller *GamesController) Create(context *gin.Context) {
	var input gamesDto.CreateGamesDTO
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	var game, err = controller.Service.Create(input)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, game)
}

func (controller *GamesController) Finish(context *gin.Context) {
	var input gamesDto.FinishGamesDto
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	if err := controller.Service.Finish(input); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Partie terminée avec succès"})
}

func (controller *GamesController) UpdateTimes(context *gin.Context) {
	var input gamesDto.UpdateTimesDto
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := controller.Service.UpdateTimes(input.GameId, input.BlackTime, input.WhiteTime); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"message": "Game times updated successfully"})
}
