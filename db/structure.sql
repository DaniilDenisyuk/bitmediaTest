CREATE TABLE users (
  id integer,
  first_name varchar(31) NOT NULL,
  last_name varchar(31),
  email varchar(31),
  gender varchar(15),
  ip_address varchar(31)
);
ALTER TABLE
  users
ADD
  CONSTRAINT pk_users_id PRIMARY KEY (id);

CREATE TABLE users_statistics (
  user_id integer not null,
  date integer not null,
  clicks integer,
  page_views integer
);
ALTER TABLE
  users_statistics
ADD
  CONSTRAINT fk_users_statistics_user_id FOREIGN KEY (user_id)
  REFERENCES users (id) ON DELETE CASCADE;
CREATE INDEX ak_users_statistics_date ON users_statistics (date);