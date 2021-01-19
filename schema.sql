DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;


CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);


CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INTEGER,
  role_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)

);

INSERT INTO department (name) 
VALUE ("Offense");
INSERT INTO department (name) 
VALUE ("Defense");
INSERT INTO department (name) 
VALUE ("Special Teams");
INSERT INTO department (name)
VALUE ("Coaching");


INSERT INTO role (title, salary, department_id) 
VALUE ("Quarterback", 39000000, 1);

INSERT INTO role (title, salary, department_id) 
VALUE ("Running back", 25000000, 1);

INSERT INTO role (title, salary, department_id) 
VALUE ("Long Snapper", 4000000, 3);

INSERT INTO role (title, salary, department_id) 
VALUE ("Head Coach", 7000000, 4);

INSERT INTO role (title, salary, department_id) 
VALUE ("Assistant Coach", 400000, 4);

INSERT INTO role (title, salary, department_id) 
VALUE ("Safety", 5000000, 2);

INSERT INTO role (title, salary, department_id) 
VALUE ("Lineman", 2500000, 2);


INSERT INTO role (title, salary, department_id) 
VALUE ("Kicker", 1000000, 3);



INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Blaine", "Allan", null, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Taya", "Gordon", 1, 2);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Izzy", "Bass", 1, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tymon", "Wilks", 1, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lester", "Friedman", null, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Noble", 1, 6);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jett", "Hulme", 1, 7);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Clyde", "May", 1, 8);

SELECT * FROM department;

SELECT * FROM employee;

SELECT * FROM role;