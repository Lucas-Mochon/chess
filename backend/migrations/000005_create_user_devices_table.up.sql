CREATE TABLE user_devices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    device_token TEXT,
    device_type VARCHAR(16),
    last_active TIMESTAMP,
    created_at TIMESTAMP DEFAULT now()
);