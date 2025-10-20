CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    plan VARCHAR(32),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    status VARCHAR(16)
);
