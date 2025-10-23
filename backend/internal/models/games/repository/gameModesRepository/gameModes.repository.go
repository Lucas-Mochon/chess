package gameModesRepository

import (
	"chesscom-copy/backend/db/models"
	gameModesDto "chesscom-copy/backend/internal/models/games/dto/game_modes"
	"database/sql"
)

type GameModesRepository struct {
	DB *sql.DB
}

func (r *GameModesRepository) List() ([]models.GameMode, error) {
	rows, err := r.DB.Query(`
        SELECT 
            id, 
            game_id, 
            game_mode_groups_id, 
            name, 
            description, 
            default_stats 
        FROM game_modes`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var gameModes []models.GameMode
	for rows.Next() {
		var gm models.GameMode
		if err := rows.Scan(
			&gm.ID,
			&gm.GameID,
			&gm.GameModeGroupsID,
			&gm.Name,
			&gm.Description,
			&gm.DefaultStats,
		); err != nil {
			return nil, err
		}
		gameModes = append(gameModes, gm)
	}
	return gameModes, nil
}

func (r *GameModesRepository) Create(gameMode gameModesDto.CreateGameModesDTO) error {
	_, err := r.DB.Exec(
		`INSERT INTO game_modes 
		(game_mode_groups_id, name, description, default_stats ) 
		VALUES ($1, $2, $3, $4)`,
		gameMode.GameModeGroupID, gameMode.Name, gameMode.Descrition, gameMode.DefaultStats,
	)

	return err
}
