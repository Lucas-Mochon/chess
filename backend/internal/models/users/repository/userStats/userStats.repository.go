package userStatsRepository

import (
	"chesscom-copy/backend/internal/models/games/repository/gameModesRepository"
	"database/sql"
	"log"
)

type UserStatsRepository struct {
	DB           *sql.DB
	GameModeRepo *gameModesRepository.GameModesRepository
}

func (r *UserStatsRepository) InitializedStats(userId int) error {
	var defaultGamesPlayed, defaultWins, defaultLosses, defaultDraws int = 0, 0, 0, 0

	gameModes, err := r.GameModeRepo.List()
	if err != nil {
		return err
	}

	for _, gm := range gameModes {
		_, err := r.DB.Exec(`
            INSERT INTO user_stats (
                user_id, rating, games_played, wins, losses, draws, game_modes_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			userId, gm.DefaultStats, defaultGamesPlayed, defaultWins, defaultLosses, defaultDraws, gm.ID,
		)
		if err != nil {
			log.Printf("Erreur lors de l'insertion des stats pour game_mode %d : %v", gm.ID, err)
			return err
		}
	}

	return err
}
