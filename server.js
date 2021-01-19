// Dependencies
var mysql = require("mysql");
const cTable = require('console.table');
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "12Aw3309!",

    database: "employee_tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as Id" + connection.threadId)
    beginningPrompt();
});
  

function beginningPrompt() {

    console.log('▁ ▂ ▄ ▅ ▆ ▇ █Ｅｍｐｌｏｙｅｅ　Ｍａｎａｇｅｒ！！█ ▇ ▆ ▅ ▄ ▂ ▁')

    inquirer.prompt({

        name: "startMenu",
        type: 'list',
        message: "What would you like to do?",
        choices: [

        "View all employees?", 
        "View all employee's by role?",
        "View all employee's by department?", 
        "Update employee",
        "Add employee?",
        "Add role?",
        "Add department?"
    ]})

    .then( function (answer) {
        switch(answer.startMenu) {

            case "View all employees?":
                viewAllEmployees()
            break;

            case "View all employee's by role?":
                viewAllRoles() 
            break;

            case "View all employee's by department?":
                viewAllDepartments() 
            break;

            case "Update employee":
                updateEmployee();
            break;

            case "Add employee?":
                addEmployee()
            break;

            case "Add role?":
                addRole();
            break;

            case "Add department?":
                addDepartment()
            break;

        };
    });
};
  
function viewAllEmployees() {

    connection.query('SELECT * FROM employee', 

    function(err, res) { if (err) throw err; console.table(res); beginningPrompt() })  
};


function viewAllRoles() {
    connection.query('SELECT * FROM role;', 

    function(err, res) { if (err) throw err; console.table(res); beginningPrompt() })
};

function viewAllDepartments() {
    connection.query('SELECT * FROM department;', 

    function(err, res) { if (err) throw err; console.table(res); beginningPrompt() })
};

function updateEmployee() {
    connection.query("SELECT id, CONCAT (first_name, '', last_name) AS name FROM employee;",

    function(err, res) { if (err) throw err; console.table(res); beginningPrompt() })
};


function addEmployee() {
    inquirer.prompt(
    {
        name:"firstName",
        type:"input",
        message:"What is the employee's first name?"
    },
    {
        name:"lastName",
        type:"input",
        message:"What is the employee's last name?"
    },
    {
        name:"role",
        type:"list",
        message:"What is the employee's role?",
        choices:selectRole()
    },
    {
        name:"manager",
        type:"list",
        message:"Who is the employee's manager?",
        choices: selectManager()
    }
    ).then(function(res) {
        
        connection.query("INSERT INTO role SET ?",

      {
        first_name: res.firstName,
        last_name: res.lastName,
        manager_id: res.manager,
        role_id: res.role
      },

      function(err) { if (err) throw err; console.table(res); beginningPrompt(); })

    });
};

function addDepartment() { 

    inquirer.prompt([

        {
          name: "name",
          type: "input",
          message: "Enter the department name."
        }

    ]).then(function(res) {
        connection.query( "INSERT INTO department SET ? ",{name: res.name},
        
        function(err) {if (err) throw err; console.table(res); beginningPrompt();})
    })
}


function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   
    function(err, res) {
      inquirer.prompt([

        {
            name: "title",
            type: "input",
            message: "What is the roles title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for the role?"
  
        },
        {
            name: "department",
            type: "list",
            message: "Select the role's department id",
            choices: selectDepartmentId()
        },
        
      ]).then(function(res) {
          connection.query("INSERT INTO role SET ?",

        {
            title: res.title,
            salary: res.salary,
            department_id: res.department
        },

        function(err) { if (err) throw err; console.table(res); beginningPrompt(); })
        
        });
    });
};

var department = [''];
function selectDepartmentId() {
  connection.query("SELECT * FROM department", function(err, res) {

    if (err) throw err; for (var i = 0; i < res.length; i++) { department.push(res[i].id); }});

  return departmentId;
}

var manager = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {

    if (err) throw err; for (var i = 0; i < res.length; i++) {manager.push(res[i].first_name);}})

    return manager;
}

var role = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {

    if (err) throw err; for (var i = 0; i < res.length; i++) {role.push(res[i].title);}})

    return role;
}