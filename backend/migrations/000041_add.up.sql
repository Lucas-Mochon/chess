ALTER TABLE user_stats
ADD COLUMN game_modes_id INTEGER REFERENCES game_modes(id);