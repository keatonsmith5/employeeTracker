const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password5",
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  init();
});

//Init function
function init() {
    //Prompt list of actions (ex. view departments, view roles etc...)
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Departments",
            "View Roles",
            "View All Employees",
            "View Employees by Department",
            "View Employees by Manager",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Exit"
        ]
    //Then run a switch case for each function that corresponds to each action
    }).then(function(answer) {
        switch (answer.action) {
            case "View Departments": 
                viewDepartments();
                break;
            case "View Roles": 
                viewRoles();
                break;
            case "View All Employees": 
                viewAllEmployees();
                break;
            case "View Employees by Department": 
                viewEmployeesByDept();
                break;
            case "View Employees by Manager": 
                viewEmployeesByManager();
                break;
            case "Add Department": 
                addDepartment();
                break;
            case "Add Role": 
                addRole();
                break;
            case "Add Employee": 
                addEmployee();
                break;
            case "Exit": 
                connection.end();
                break;
        }
    })
}
    

//View departments
function viewDepartments() {
    //query variable
    const query = "SELECT * FROM departments";
    //connection
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        //run init
        init();
    }) 
}
    
//View roles
function viewRoles() {
    //query variable
    const query = "SELECT role_id, role_title FROM roles";
    //connection
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        //run init
        init();
    })  
}

//View All Employees
function viewAllEmployees() {
    //query variable
    const query = "SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name FROM employees LEFT JOIN roles ON employees.role_id = roles.role_id LEFT JOIN departments ON roles.department_id = departments.department_id";
    //connection
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        //run init
        init();
    });
}         

//View employees by department
function viewEmployeesByDept() {
    let array = []
    //query for list of all departments
    const query = "SELECT department_id AS value, department_name AS name FROM departments"
    //connection
    connection.query(query, (err, res) => {
        if(err) throw err;
        //push them into an array
        array = JSON.parse(JSON.stringify(res));
        //prompt which dep
        inquirer
            .prompt({
                name: "department",
                type: "list",
                message: "For which department do you want to view the employees?",
                choices: array
            //then query for the specific employees
            }).then(function (answer) {
                connection.query(`SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name FROM employees LEFT JOIN roles ON employees.role_id = roles.role_id LEFT JOIN departments ON roles.department_id = departments.department_id WHERE departments.department_id = ${answer.department}`, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                });
            });
    });
}

//View employees by manager
function viewEmployeesByManager() {
    let array = []
    //query for list of all managers
    const query = "SELECT employees.employee_id AS value, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees INNER JOIN roles ON employees.role_id = roles.role_id WHERE roles.manager = 1"
    //connection
    connection.query(query, (err, res) => {
        if(err) throw err;
        //push them into an array
        array = JSON.parse(JSON.stringify(res));
        //prompt which manager
        inquirer
            .prompt({
                name: "manager",
                type: "list",
                message: "For which manager do you want to view the employees?",
                choices: array
            //then query for the specific employees under that manager
            }).then(function (answer) {
                connection.query(`SELECT employees.employee_id, employees.first_name, employees.last_name FROM employees WHERE manager_id = ${answer.manager}`, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                });
            });
    });
}

//Add department
function addDepartment() {
    //prompt name of new department
    inquirer
        .prompt({
            name: "name",
            type: "input",
            message: "What is the name of the department you want to add?"
        //then query that inserts that department into database
        }).then(function(answer) {
            const query = "INSERT INTO departments (department_name) VALUES (?)";
            connection.query(query, answer.name, (err, res) => {
                if (err) throw err;
                if(res.affectedRows > 0) {
                    console.log(res.affectedRows + " department added successfully added!");
                }
                init();
            });
        });
}
    
//Add role
function addRole() {
    let array = [];
    //query for departments
    const query = "SELECT department_id AS value, department_name AS name FROM departments";
    connection.query(query, (err, res) => {
        if(err) throw err;
        //push departments into an array
        array = JSON.parse(JSON.stringify(res));
    //create array of questions
    const questions = [
        {
            type: "input",
            name: "name",
            message: "What is the name of the role you want to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role you want to add?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department do you want to add this role to?",
            choices: array
        },
        {
            type: "confirm",
            name: "manager",
            message: "Is this a manager role?"
        },
    ]
    //prompt questions then query that inserts role into database
    inquirer
    .prompt(questions).then(function(answer) {
        const query = "INSERT INTO roles (role_title, role_salary, department_id, manager) VALUES (?, ?, ?, ?)";
        connection.query(query, [answer.name, answer.salary, answer.department, answer.manager], (err, res) => {
            if (err) throw err;
            if(res.affectedRows > 0) {
                console.log(res.affectedRows + " department added successfully added!");
            }
            init();
        });
    });
});
}
    

//Add employee
    //prompt first name
    //prompt last name
    //then query for roles
    //push roles into array
    //then prompt role. choices are array
    //then query all managers
    //create another array for managers
    //prompt choose manager. choices are the array
    //then query that inserte employee into database

    //run init



