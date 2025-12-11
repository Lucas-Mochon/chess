package matchmakingController

import (
	mathchmakingService "chesscom-copy/backend/internal/models/games/services/matchmaking"
	usersRepository "chesscom-copy/backend/internal/models/users/repository/users"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MatchmakingController struct {
	Service   *mathchmakingService.MatchmakingService
	UsersRepo *usersRepository.UserRepository
}

func NewMatchmakingController(service *mathchmakingService.MatchmakingService, usersRepo *usersRepository.UserRepository) *MatchmakingController {
	return &MatchmakingController{
		Service:   service,
		UsersRepo: usersRepo,
	}
}

func (ctrl *MatchmakingController) JoinQueue(c *gin.Context) {
	playerIdStr := c.Query("playerId")
	gameModeIdStr := c.Query("gameModeId")

	if playerIdStr == "" || gameModeIdStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "playerId and gameModeId are required"})
		return
	}

	playerId, err := strconv.Atoi(playerIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid playerId"})
		return
	}

	gameModeId, err := strconv.Atoi(gameModeIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid gameModeId"})
		return
	}

	player, err := ctrl.UsersRepo.GetByID(playerId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "player not found"})
		return
	}

	gameInfo, err := ctrl.Service.JoinQueue(player, gameModeId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if gameInfo.Id == 0 {
		c.JSON(http.StatusOK, gin.H{
			"status":  "waiting",
			"message": "player added to queue",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "matched",
		"game":   gameInfo,
	})
}
