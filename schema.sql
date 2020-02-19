CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) ,
    last_name VARCHAR(30),
    role_id INT ,
    FOREIGN KEY(role_id) REFERENCES roles(id),
    manager_id INT ,
    manager BOOLEAN,
    PRIMARY KEY(id);
);
CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2),
    department_id INT ,
    FOREIGN KEY(department_id) REFERENCES department(id),
    PRIMARY KEY(id)
);
CREATE TABLE department(
    id  INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY(id)
);
