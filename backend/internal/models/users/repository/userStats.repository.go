package repository

// import "database/sql"

// type UserStatsRepository struct {
// 	DB *sql.DB
// }

// func (r *UserStatsRepository) initializedStats(userId int) error {
// 	var defaultGamesPlayed, defaultWins, defaultLosses, defaultDraws int = 0

// 	_, err := r.DB.Exec(
// 		`INSERT INTO
// 		user_stats (user_id, rating, games_played, wins, losses, draws, game_modes_id)
// 		VALUES ($1, $2, $3, $4, $5, $6, $7)`,
// 		userId, defaultRating, defaultGamesPlayed, defaultWins, defaultLosses, defaultDraws, gameModesId,
// 	)

// 	return err
// }
