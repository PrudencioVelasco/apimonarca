CREATE TABLE users(
id BIGSERIAL PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
name VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
phone VARCHAR(18) NOT NULL unique,
image VARCHAR(255)  NULL,
password VARCHAR(255) NOT NULL,
is_available boolean null,
session_toke VARCHAR(255)  NULL,
create_at timestamp(0) not null,
update_at timestamp(0) not null
);