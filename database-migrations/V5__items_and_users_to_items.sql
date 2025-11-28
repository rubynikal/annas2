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

WITH random_items AS (
	SELECT
		u.id AS user_id,
		i.id AS item_id,
		ROW_NUMBER() OVER (PARTITION BY u.id ORDER BY RANDOM()) as rn
	FROM
		users u
	CROSS JOIN
		items i
)

INSERT INTO users_to_items (user_id, item_id)
SELECT
	user_id,
	item_id
FROM
	random_items
WHERE
	rn<=5;