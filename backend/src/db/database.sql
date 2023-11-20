CREATE DATABASE node_chat;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Future features
--
-- CREATE TABLE rooms (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE room_users (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL,
--   room_id INTEGER NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES users (id),
--   FOREIGN KEY (room_id) REFERENCES rooms (id)
-- );

-- CREATE TABLE room_messages (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL,
--   room_id INTEGER NOT NULL,
--   message TEXT NOT NULL,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--   FOREIGN KEY (user_id) REFERENCES users (id),
--   FOREIGN KEY (room_id) REFERENCES rooms (id)
-- );
