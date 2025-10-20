CREATE TABLE video_comments (
    id SERIAL PRIMARY KEY,
    video_id INTEGER REFERENCES videos(id),
    user_id INTEGER REFERENCES users(id),
    comment TEXT,
    commented_at TIMESTAMP DEFAULT now()
);
