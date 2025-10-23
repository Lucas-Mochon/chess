package gameModesController

import (
	gameModesDto "chesscom-copy/backend/internal/models/games/dto/game_modes"
	"chesscom-copy/backend/internal/models/games/services/gameModesService"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GameModesController struct {
	Service *gameModesService.GameModesService
}

func (c *GameModesController) List(ctx *gin.Context) {
	gameModes, err := c.Service.List()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gameModes)
}

func (c *GameModesController) Create(ctx *gin.Context) {
	var input gameModesDto.CreateGameModesDTO
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.Create(input); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Mode de jeu créé avec succès"})
}
