CREATE TABLE puzzle_ratings (
    id SERIAL PRIMARY KEY,
    puzzle_id INTEGER REFERENCES puzzles(id),
    rating INTEGER,
    rated_by INTEGER REFERENCES users(id),
    rated_at TIMESTAMP DEFAULT now()
);
