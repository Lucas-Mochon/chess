CREATE TABLE game_modes (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id),
    game_mode_groups_id INTEGER REFERENCES game_mode_groups(id),
    name VARCHAR(64),
    description TEXT
);