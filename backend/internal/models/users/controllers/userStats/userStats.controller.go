package userStatsController

import (
	userStatsService "chesscom-copy/backend/internal/models/users/services/userStats"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserStatsController struct {
	UserStatsService *userStatsService.UserStatsService
}

func (c *UserStatsController) InitializedStats(ctx *gin.Context) {
	var input struct {
		UserId int `json:"userId" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "userId is required"})
		return
	}

	err := c.UserStatsService.InitializedStats(input.UserId)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "Stats Initialisé avec succès"})
}
