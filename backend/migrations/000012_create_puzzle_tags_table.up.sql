CREATE TABLE puzzle_tags (
    id SERIAL PRIMARY KEY,
    puzzle_id INTEGER REFERENCES puzzles(id),
    tag VARCHAR(32)
);
