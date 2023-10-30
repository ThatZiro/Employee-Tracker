DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(255) NOT NULL
);

CREATE TABLE role (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL
);

CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

CREATE TABLE classrooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  building_name VARCHAR(30) NOT NULL,
  room_number INT NOT NULL,
  available BOOLEAN NOT NULL,
  date_updated DATETIME NOT NULL
);
