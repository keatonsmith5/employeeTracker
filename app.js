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
    const query = "SELECT * FROM roles";
    //connection
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        //run init
        init();
    })
    
}
    

//View employees by department
    //query for list of all departments
    //push them into an array
    //connection

    //prompt which dep
    //choices are the array from above
    //then query for the specific employees

    //run init

//View employees by manager
    //query for list of all managers
    //push into an array
    //connection

    //prompt which manager
    //choices are the array
    //then query for the specific employees in that department

    //run init

//Add department
    //prompt name of new department
    //then query that inserts that department into database

    //run init

//Add role
    //query for departments
    //push departments into array
    //create array of questions
        //what is name of role
        //what is salary
        //which department (choices are array from above)
        //Is it a manager role (true or false)
    //prompt questions 
    //then query that inserts role into database

    //run init

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



