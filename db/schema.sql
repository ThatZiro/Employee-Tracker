DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  department_id INT NOT NULL,
  department VARCHAR(255) NOT NULL, 
);

CREATE TABLE role (
  role_id INT NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  salary VARCHAR(255) NOT NULL,
);

CREATE TABLE employees (
  employee_id INT NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
  role_id INT NOT NULL,
  manager_id  INT NOT NULL,

);

CREATE TABLE classrooms (
  id INT NOT NULL,
  building_name VARCHAR(30) NOT NULL,
  room_number INT NOT NULL,
  available BOOLEAN NOT NULL,
  date_updated DATETIME NOT NULL
);
