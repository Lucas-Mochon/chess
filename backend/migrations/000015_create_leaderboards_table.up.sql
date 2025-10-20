CREATE TABLE leaderboards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    description TEXT,
    created_at TIMESTAMP DEFAULT now()
);
