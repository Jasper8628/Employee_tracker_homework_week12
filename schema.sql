CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name NOT NULL VARCHAR(30),
    last_name NOT NULL VARCHAR(30),
    role_id INT ,
    FOREIGN KEY(role_id) REFERENCES roles(id),
    manager_id INT ,
    FOREIGN KEY (manager_id) REFERENCES managers(id),
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
    department_id VARCHAR(30),
    PRIMARY KEY(id)

);
CREATE TABLE managers(
    id INT NOT NULL AUTO_INCREMENT,
    first_name NOT NULL VARCHAR(30),
    last_name NOT NULL VARCHAR(30),
    PRIMARY KEY (id)

);