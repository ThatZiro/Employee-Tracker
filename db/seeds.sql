INSERT INTO department (department) VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('Human Resources');

 INSERT INTO role (job_title, department, salary) VALUES
  ('Sales Manager', '1', '60000'),
  ('Marketing Specialist', '2', '50000'),
  ('Software Engineer', '3', '75000'),
  ('HR Coordinator', '4', '45000');

 INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, 1),
  ('Alice', 'Brown', 4, NULL);
