CREATE TABLE user_premium_status (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    feature_id INTEGER REFERENCES premium_features(id),
    activated_at TIMESTAMP DEFAULT now(),
    expires_at TIMESTAMP
);