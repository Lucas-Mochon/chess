CREATE TABLE user_puzzle_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    puzzle_id INTEGER REFERENCES puzzles(id),
    solved BOOLEAN DEFAULT false,
    attempts INTEGER DEFAULT 0,
    last_attempt_at TIMESTAMP
);
