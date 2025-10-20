CREATE TABLE lesson_steps (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(id),
    step_number INTEGER,
    content TEXT
);
