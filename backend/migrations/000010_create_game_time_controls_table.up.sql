CREATE TABLE game_time_controls (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id),
    time_control VARCHAR(32)
);
