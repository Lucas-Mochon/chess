CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER REFERENCES users(id),
    reported_user_id INTEGER REFERENCES users(id),
    reason TEXT,
    reported_at TIMESTAMP DEFAULT now()
);
