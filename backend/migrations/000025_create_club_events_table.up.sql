CREATE TABLE club_events (
    id SERIAL PRIMARY KEY,
    club_id INTEGER REFERENCES clubs(id),
    name VARCHAR(128),
    description TEXT,
    event_date TIMESTAMP
);