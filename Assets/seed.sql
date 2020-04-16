INSERT INTO employee_trackerDB.departments (department_id, department_name)
VALUES (1, "Product");

INSERT INTO employee_trackerDB.departments (department_id, department_name)
VALUES (2, "Finance");

INSERT INTO employee_trackerDB.departments (department_id, department_name)
VALUES (3, "Legal");

INSERT INTO employee_trackerDB.departments (department_id, department_name)
VALUES (4, "Sales");

INSERT INTO employee_trackerDB.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (1, "Product Manager", 200000, 1, 1);

INSERT INTO employee_trackerDB.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (2, "Engineer", 200000, 1, 0);

INSERT INTO employee_trackerDB.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (3, "Senior Financial Analyst", 150000, 2, 1);

INSERT INTO employee_trackerDB.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (4, "Junior Financial Analyst", 80000, 2, 0);

INSERT INTO employee_trackerDB.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (5, "Senior Legal Analyst", 175000, 3, 1);

INSERT INTO employee_trackerDB.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (6, "Junior Legal Analyst", 90000, 3, 0);

INSERT INTO employee_trackerDB.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (7, "Sales Manager", 140000, 4, 1);

INSERT INTO employee_trackerDB.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (8, "Sales Manager", 60000, 4, 0);


INSERT INTO employee_trackerDB.employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (1, "Johnny", "Drama", 1, NULL);

INSERT INTO employee_trackerDB.employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (2, "Turtle", "Neck", 2, 1);

INSERT INTO employee_trackerDB.employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (3, "Vincent", "Chase", 3, NULL);

INSERT INTO employee_trackerDB.employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (4, "Eric", "Murphy", 4, 3);

INSERT INTO employee_trackerDB.employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (5, "Jerry", "Seinfeld", 5, NULL);

INSERT INTO employee_trackerDB.employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (6, "George", "Costanza", 6, 5);

INSERT INTO employee_trackerDB.employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (7, "Elaine", "Benes", 7, NULL);

INSERT INTO employee_trackerDB.employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (8, "Cosmo", "Kramer", 8, 7);