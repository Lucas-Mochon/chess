CREATE TABLE user_flags (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    flag_type VARCHAR(32),
    flagged_at TIMESTAMP DEFAULT now()
);
