CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128),
    url TEXT,
    uploaded_by INTEGER REFERENCES users(id),
    uploaded_at TIMESTAMP DEFAULT now()
);
