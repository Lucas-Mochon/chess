CREATE TABLE puzzles (
    id SERIAL PRIMARY KEY,
    title TEXT,
    fen TEXT,
    solution TEXT[],
    difficulty INTEGER,
    created_at TIMESTAMP DEFAULT now()
);
