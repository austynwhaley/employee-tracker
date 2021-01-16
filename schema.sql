DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;


CREATE TABLE deparment (
   id  INTEGER AUTO_INCREMENT, NOT NULL, 
   name VARCHAR(30) NOT NULL,
   PRIMARY KEY (id) 
);

CREATE TABLE role (
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(6,2)
    department_id INTEGER AUTO_INCREMENT, NOT NULL
);


CREATE TABLE employee (
id INTEGER AUTO_INCREMENT, NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id
manager_id
PRIMARY KEY (id)
)
