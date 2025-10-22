package gameModeGroupsRepository

import (
	"chesscom-copy/backend/db/models"
	gameModeGroupsDto "chesscom-copy/backend/games/dto/game_mode_groups"
	"database/sql"
)

type GameModeGroupsRepository struct {
	DB *sql.DB
}

func (r *GameModeGroupsRepository) List() ([]models.GameModeGroup, error) {
	rows, err := r.DB.Query("SELECT id, name, logo FROM game_mode_groups")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var gameModeGroups []models.GameModeGroup
	for rows.Next() {
		var gmg models.GameModeGroup
		if err := rows.Scan(&gmg.ID, &gmg.Name, &gmg.Logo); err != nil {
			return nil, err
		}
		gameModeGroups = append(gameModeGroups, gmg)
	}
	return gameModeGroups, nil
}

func (r *GameModeGroupsRepository) Create(gameModeGroups gameModeGroupsDto.CreateGameModeGroupsDTO) error {
	_, err := r.DB.Exec(
		"INSERT INTO game_mode_groups (name, logo) VALUES ($1, $2)",
		gameModeGroups.Name, gameModeGroups.Logo,
	)

	return err
}
