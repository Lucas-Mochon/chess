package gameMovesController

import (
	gameMovesDto "chesscom-copy/backend/internal/models/games/dto/game_moves"
	gameMovesService "chesscom-copy/backend/internal/models/games/services/gameMoves"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type GameMovesController struct {
	Service *gameMovesService.GameMovesService
}

func (controller *GameMovesController) ListByGame(context *gin.Context) {
	gameIdStr := context.Param("gameId")
	gameId, err := strconv.Atoi(gameIdStr)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid game ID"})
		return
	}
	gameMoveGroups, err := controller.Service.ListByGame(gameId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gameMoveGroups)
}

func (controller *GameMovesController) Create(context *gin.Context) {
	var input gameMovesDto.CreateGameMovesDto
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := controller.Service.Create(input); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Coup avec succès"})
}
