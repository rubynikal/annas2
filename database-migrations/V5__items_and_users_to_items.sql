CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE users_to_items (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, item_id)
);

INSERT INTO items (name) SELECT 'Item ' || (n)::text FROM generate_series(1, 1000) n;