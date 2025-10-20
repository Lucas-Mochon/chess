CREATE TABLE bans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    reason TEXT,
    banned_at TIMESTAMP DEFAULT now(),
    expires_at TIMESTAMP
);
