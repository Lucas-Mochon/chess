package matchmakingController

import (
	mathchmakingService "chesscom-copy/backend/internal/models/games/services/matchmaking"
	usersService "chesscom-copy/backend/internal/models/users/services/users"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MatchmakingController struct {
	Service     *mathchmakingService.MatchmakingService
	UserService *usersService.UserService
}

func NewMatchmakingController(service *mathchmakingService.MatchmakingService, userService *usersService.UserService) *MatchmakingController {
	return &MatchmakingController{
		Service:     service,
		UserService: userService,
	}
}

func (ctrl *MatchmakingController) JoinQueue(c *gin.Context) {
	playerIdStr := c.Param("userId")
	gameModeIdStr := c.Param("gameModeId")

	if playerIdStr == "" || gameModeIdStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "userId and gameModeId are required", "data": playerIdStr + " " + gameModeIdStr})
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

	player, err := ctrl.UserService.GetById(playerId)
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

func (ctrl *MatchmakingController) GetPlayerQueueStatus(c *gin.Context) {
	playerIdStr := c.Param("userId")
	if playerIdStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "userId is required"})
		return
	}

	playerId, err := strconv.Atoi(playerIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid playerId"})
		return
	}

	status, gameInfo, err := ctrl.Service.GetPlayerQueueStatus(playerId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if status == "waiting" {
		c.JSON(http.StatusOK, gin.H{
			"message": "player added to queue",
			"status":  status,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"game":   gameInfo,
			"status": status,
		})
	}
}
