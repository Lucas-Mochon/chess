CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description TEXT,
    owner_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now()
);
