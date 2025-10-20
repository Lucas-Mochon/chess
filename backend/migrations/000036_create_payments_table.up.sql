CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount DECIMAL(10,2),
    currency VARCHAR(8),
    payment_date TIMESTAMP DEFAULT now(),
    method VARCHAR(32)
);
