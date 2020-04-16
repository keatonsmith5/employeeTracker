DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(30) NOT NULL,
	PRIMARY KEY (department_id)
);

CREATE TABLE roles (
	role_id INT NOT NULL AUTO_INCREMENT,
    role_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL(8,0) NULL,
    department_id INT NOT NULL,
    manager BOOLEAN NOT NULL default(0),
    PRIMARY KEY (role_id),
    FOREIGN KEY(department_id) REFERENCES departments(department_id)
);

CREATE TABLE employees (
	employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY(role_id) REFERENCES roles(role_id)
    );