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
            game_mode_groups_id, 
            name, 
            description, 
            default_stats,
			time
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
			&gm.GameModeGroupsID,
			&gm.Name,
			&gm.Description,
			&gm.DefaultStats,
			&gm.Time,
		); err != nil {
			return nil, err
		}
		gameModes = append(gameModes, gm)
	}
	return gameModes, nil
}

func (r *GameModesRepository) GetOne(id int) (models.GameMode, error) {
	var gameMode models.GameMode

	err := r.DB.QueryRow(`SELECT id, game_mode_groups_id, name, description, default_stats, time FROM game_modes WHERE id = $1`, id).
		Scan(&gameMode.ID, &gameMode.GameModeGroupsID, &gameMode.Name, &gameMode.Description, gameMode.DefaultStats, gameMode.Time)
	if err != nil {
		return gameMode, err
	}

	return gameMode, nil
}

func (r *GameModesRepository) Create(gameMode gameModesDto.CreateGameModesDTO) error {
	_, err := r.DB.Exec(
		`INSERT INTO game_modes 
		(game_mode_groups_id, name, description, default_stats, time) 
		VALUES ($1, $2, $3, $4, $5)`,
		gameMode.GameModeGroupID, gameMode.Name, gameMode.Descrition, gameMode.DefaultStats, gameMode.Time,
	)

	return err
}
