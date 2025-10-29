package gameMovesRepository

import (
	"chesscom-copy/backend/db/models"
	gameMovesDto "chesscom-copy/backend/internal/models/games/dto/game_moves"
	"database/sql"
	"time"
)

type GameMovesRepository struct {
	DB *sql.DB
}

func (repository *GameMovesRepository) ListByGame(gameId int) ([]models.GameMoves, error) {
	rows, err := repository.DB.Query(`
		SELECT
			id,
			game_id,
			move_number,
			notation,
			timestamp
		FROM game_moves`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var gameMoves []models.GameMoves
	for rows.Next() {
		var gm models.GameMoves
		if err := rows.Scan(
			&gm.Id,
			&gm.GameId,
			&gm.MoveNumber,
			&gm.Notation,
			&gm.Timestamp,
		); err != nil {
			return nil, err
		}
		gameMoves = append(gameMoves, gm)
	}
	return gameMoves, nil
}

func (repository *GameMovesRepository) Create(gameMove gameMovesDto.CreateGameMovesDto) error {
	_, err := repository.DB.Exec(`
		INSERT INTO game_moves
		(game_id, move_number, notation, timestamp)
		VALUES ($1, $2, $3, $4)
		`,
		gameMove.GameId, gameMove.MoveNumber, gameMove.Notation, time.Now(),
	)

	return err
}
