CREATE TABLE game_reports (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id),
    reporter_id INTEGER REFERENCES users(id),
    reason TEXT,
    reported_at TIMESTAMP DEFAULT now()
);
