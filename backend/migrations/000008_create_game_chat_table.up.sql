CREATE TABLE game_chat (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id),
    sender_id INTEGER REFERENCES users(id),
    message TEXT,
    sent_at TIMESTAMP DEFAULT now()
);
