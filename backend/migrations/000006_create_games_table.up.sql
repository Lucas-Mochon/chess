CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    white_player_id INTEGER REFERENCES users(id),
    black_player_id INTEGER REFERENCES users(id),
    result VARCHAR(16),
    duration_seconds INTEGER,
    started_at TIMESTAMP,
    ended_at TIMESTAMP
);
