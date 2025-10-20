CREATE TABLE tournament_games (
    id SERIAL PRIMARY KEY,
    round_id INTEGER REFERENCES tournament_rounds(id),
    game_id INTEGER REFERENCES games(id)
);
