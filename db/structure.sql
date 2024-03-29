CREATE TABLE if not exists users (
  id integer PRIMARY KEY,
  first_name varchar(31) NOT NULL,
  last_name varchar(31),
  email varchar(31),
  gender varchar(15),
  ip_address varchar(31)
);

CREATE TABLE if not exists users_statistics (
  user_id integer not null,
  date integer not null,
  clicks integer,
  page_views integer,
  FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ak_users_statistics_date ON users_statistics (date);