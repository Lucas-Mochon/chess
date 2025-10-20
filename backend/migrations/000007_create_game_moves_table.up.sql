CREATE TABLE game_moves (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id),
    move_number INTEGER,
    notation VARCHAR(16),
    timestamp TIMESTAMP
);
