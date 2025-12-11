package mathchmakingRepository

import (
	"chesscom-copy/backend/db/models"
	"database/sql"
	"sync"
)

type MatchmakingRepository struct {
	DB *sql.DB
}

var (
	queue      []models.Users
	queueMutex sync.Mutex
)

func (repository *MatchmakingRepository) AddPlayerToQueue(player models.Users) {
	queueMutex.Lock()
	defer queueMutex.Unlock()
	queue = append(queue, player)
}

func (repository *MatchmakingRepository) PopTwoPlayers() (models.Users, models.Users, bool) {
	queueMutex.Lock()
	defer queueMutex.Unlock()

	if len(queue) < 2 {
		return models.Users{}, models.Users{}, false
	}

	p1 := queue[0]
	p2 := queue[1]
	queue = queue[2:]
	return p1, p2, true
}
