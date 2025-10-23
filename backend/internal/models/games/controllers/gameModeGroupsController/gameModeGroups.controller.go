package gameModeGroupsController

import (
	dto "chesscom-copy/backend/internal/models/games/dto/game_mode_groups"
	"chesscom-copy/backend/internal/models/games/services/gameModeGroupsService"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GameModeGroupsController struct {
	Service *gameModeGroupsService.GameModeGroupsService
}

func (c *GameModeGroupsController) List(ctx *gin.Context) {
	gameModeGroups, err := c.Service.List()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gameModeGroups)
}

func (c *GameModeGroupsController) Create(ctx *gin.Context) {
	var input dto.CreateGameModeGroupsDTO
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := c.Service.Create(input); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Groupe de jeu créé avec succès"})
}
