DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;


CREATE TABLE deparment (
   id  INTEGER AUTO_INCREMENT, NOT NULL, 
   name VARCHAR(30) NOT NULL,
   PRIMARY KEY (id) 
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT, NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,0)
    department_id INTEGER AUTO_INCREMENT, NOT NULL
    PRIMARY KEY (id)
);


CREATE TABLE employee (
id INTEGER AUTO_INCREMENT, NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER
manager_id INTEGER
PRIMARY KEY (id)
)


INSERT INTO department (name) --1
VALUE ("Offense");
INSERT INTO department (name) --2
VALUE ("Defence");
INSERT INTO department (name) --3
VALUE ("Special Teams");
INSERT INTO department (name) --4
VALUE ("Coaching");

INSERT INTO role (title, salary, department_id) 
VALUE ("Quarterback", 39000000, 1);

INSERT INTO role (title, salary, department_id) 
VALUE ("Running back", 25000000, 1);

INSERT INTO role (title, salary, department_id) 
VALUE ("Long Snapper", 4000000, 3);

INSERT INTO role (title, salary, department_id) 
VALUE ("Head Coach", 9000000, 4);

INSERT INTO role (title, salary, department_id) 
VALUE ("Assistant Coach", 400000, 4);

INSERT INTO role (title, salary, department_id) 
VALUE ("Safety", 5000000, 2);

INSERT INTO role (title, salary, department_id) 
VALUE ("Lineman", 2500000, 2);


INSERT INTO role (title, salary, department_id) 
VALUE ("Kicker", 1000000, 3);



INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tymon", "Wilks", 3, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Taya", "Gordon", null, 2);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Izzy", "Bass", 1, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Blaine", "Allan", 4, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lester", "Friedman", 4, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Noble", 2, 6);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jett", "Hulme", null, 7);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Clyde", "May", 1, 8);

--SELECT * FROM department

--SELECT * FROM employee

--SELECT * FROM role