CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_by INTEGER REFERENCES users(id)
);