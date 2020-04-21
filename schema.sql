DROP TABLE IF EXISTS stories;

CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  user VARCHAR(255),
  location VARCHAR(255),
  story TEXT,
  category VARCHAR(255),
);