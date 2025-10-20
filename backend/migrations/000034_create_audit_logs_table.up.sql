CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(128),
    details TEXT,
    logged_at TIMESTAMP DEFAULT now()
);
