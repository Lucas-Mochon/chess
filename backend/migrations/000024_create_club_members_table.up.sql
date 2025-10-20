CREATE TABLE club_members (
    id SERIAL PRIMARY KEY,
    club_id INTEGER REFERENCES clubs(id),
    user_id INTEGER REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT now()
);
