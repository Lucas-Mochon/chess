CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128),
    description TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT now()
);
