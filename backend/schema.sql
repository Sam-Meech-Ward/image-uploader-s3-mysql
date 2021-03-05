create database app3000;
use app3000;

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(255),
  image_url VARCHAR(255),
  `timestamp` TIMESTAMP DEFAULT NOW()
);