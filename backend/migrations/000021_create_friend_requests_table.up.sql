CREATE TABLE friend_requests (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    status VARCHAR(16),
    sent_at TIMESTAMP DEFAULT now()
);
