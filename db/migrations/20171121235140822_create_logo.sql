-- +micrate Up
CREATE TABLE logos (
  id BIGSERIAL PRIMARY KEY,
  image_gray TEXT,
  image_colorfull TEXT,
  animation TEXT,
  size TEXT,
  title_en TEXT,
  title_uk TEXT,
  position INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- +micrate Down
DROP TABLE IF EXISTS logos;
