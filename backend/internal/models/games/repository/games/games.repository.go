package gamesRepository

import (
	"chesscom-copy/backend/db/models"
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

func (repository *GamesRepository) Create(game gamesDto.CreateGamesDTO) (models.Games, error) {
	result, err := repository.DB.Exec(`
        INSERT INTO games (white_player_id, black_player_id, result, duration_seconds, started_at, ended_at, game_mode_id)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)`,
		game.WhitePlayerId,
		game.BlackPlayerId,
		game.Result,
		game.DurationSeconds,
		game.GameModeId,
	)
	if err != nil {
		return models.Games{}, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return models.Games{}, err
	}

	createdGame := models.Games{
		Id:              int(id),
		WhitePlayerId:   game.WhitePlayerId,
		BlackPlayerId:   game.BlackPlayerId,
		Result:          game.Result,
		DurationSeconds: game.DurationSeconds,
	}

	return createdGame, nil
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

func (repository *GamesRepository) GetOneGame(id int) (gamesDto.GameInformationResponse, error) {
	row := repository.DB.QueryRow(`
		SELECT games.id as game_id,
			games.result as result,
			game_mode.name as game_mode-name,
			game_mode.id as game_mode_id,
			game_mode.logo as game_mode_logo,
			white_player.username as white_player_name,
			white_player.id as white_player_id,
			white_player.picture as white_player_picture,
			white_player.country as white_player_country,
			white_player_stats.rating as white_player_rating,
			black_player.username as black_player_name,
			black_player.id as black_player_id,
			black_player.picture as black_player_picture,
			black_player.country as black_player_country,
			black_player_stats.rating as black_player_rating
			FROM games
			JOIN game_modes as game_mode ON games.game_mode_id = game_modes.id
			JOIN users as white_player ON games.white_player_id = white_player.id
			JOIN users as black_player ON games.black_player_id = black_player.id
			JOIN user_stats as white_player_stats ON white_player.id = white_player_stats.user_id AND white_player_stats.game_modes_id = game_mode.id
			JOIN user_stats as black_player_stats ON black_player.id = black_player_stats.user_id AND black_player_stats.game_modes_id = game_mode.id
			WHERE games.id = ?`, id,
	)

	var g gamesDto.GameInformationResponse
	err := row.Scan(
		&g.Result,
		&g.Id,
		&g.GameModeName,
		&g.GameModeId,
		&g.WhitePlayerId,
		&g.WhitePlayerName,
		&g.WhitePlayerPicture,
		&g.WhitePlayerCountry,
		&g.WhitePlayerRating,
		&g.BlackPlayerId,
		&g.BlackPlayerName,
		&g.BlackPlayerPicture,
		&g.BlackPlayerCountry,
		&g.BlackPlayerRating,
	)
	if err != nil {
		return gamesDto.GameInformationResponse{}, err
	}

	return g, nil

}
