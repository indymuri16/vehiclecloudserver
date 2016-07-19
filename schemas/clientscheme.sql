CREATE TABLE clientqueries (
  time     INT PRIMARY KEY AUTO_INCREMENT,
  id VARCHAR(10) NOT NULL,
  location VARCHAR(10) NOT NULL,
  requesttype  VARCHAR(10) NOT NULL,
  misc   VARCHAR(10) NOT NULL
);
