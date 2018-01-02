-- +micrate Up
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  image_url TEXT,
  size TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS projects;
