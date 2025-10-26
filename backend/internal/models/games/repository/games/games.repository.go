package gamesRepository

import (
	gamesDto "chesscom-copy/backend/internal/models/games/dto/games"
	"database/sql"
)

type GamesRepository struct {
	DB *sql.DB
}

func (repository *GamesRepository) ListMe(userID int) ([]gamesDto.GameRow, error) {
	rows, err := repository.DB.Query(`
		SELECT 
			games.id as game_id, 
			white_player.id,
			white_player.username, 
			black_player.id,
			black_player.username, 
			games.result as result, 
			games.duration_seconds as duration_seconds, 
			games.started_at as started_at, 
			games.ended_at as ended_at
		FROM games
		INNER JOIN users white_player ON white_player.id = games.white_player_id
		INNER JOIN users black_player ON black_player.id = games.black_player_id
		WHERE games.white_player_id = $1
		OR games.black_player_id = $1
		ORDER BY games.id DESC;
	`, userID)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var games []gamesDto.GameRow
	for rows.Next() {
		var g gamesDto.GameRow
		if err := rows.Scan(
			&g.Id,
			&g.WhitePlayerId,
			&g.WhitePlayerName,
			&g.BlackPlayerId,
			&g.BlackPlayerName,
			&g.Result,
			&g.DurationSeconds,
			&g.StartedAt,
			&g.EndedAt,
		); err != nil {
			return nil, err
		}
		games = append(games, g)
	}
	return games, nil
}

func (repository *GamesRepository) GetById(gameId int) (gamesDto.GameRow, error) {
	row := repository.DB.QueryRow(`
        SELECT 
            games.id AS game_id, 
			white_player.id,
			white_player.username, 
			black_player.id,
			black_player.username, 
            games.result as result, 
            games.duration_seconds as duration_seconds, 
            games.started_at as started_at, 
            games.ended_at as ended_at
        FROM games
        INNER JOIN users white_player ON white_player.id = games.white_player_id
        INNER JOIN users black_player ON black_player.id = games.black_player_id
        WHERE games.id = $1;
    `, gameId)

	var g gamesDto.GameRow
	err := row.Scan(
		&g.Id,
		&g.WhitePlayerId,
		&g.WhitePlayerName,
		&g.BlackPlayerId,
		&g.BlackPlayerName,
		&g.Result,
		&g.DurationSeconds,
		&g.StartedAt,
		&g.EndedAt,
	)
	if err != nil {
		return gamesDto.GameRow{}, err
	}

	return g, nil
}

func (repository *GamesRepository) Create(game gamesDto.CreateGamesDTO) error {
	_, err := repository.DB.Exec(
		`INSERT INTO games
		(white_player_id, black_player_id, game_mode_id, started_at)
		VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
		game.WhitePlayerId, game.BlackPlayerId, game.GameModeId,
	)

	return err
}

func (repository *GamesRepository) Finish(game gamesDto.FinishGamesDto) error {
	_, err := repository.DB.Exec(`
		UPDATE games
		SET result = $2,
			duration_seconds = $3,
			ended_at = CURRENT_TIMESTAMP
		WHERE id = $1;
		`, game.Id, game.Result, game.DurationSeconds,
	)

	return err
}
