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

    console.log('▁ ▂ ▄ ▅ ▆ ▇ █！！Ｅｍｐｌｏｙｅｅ　Ｍａｎａｇｅｒ！！█ ▇ ▆ ▅ ▄ ▂ ▁')

    inquirer.prompt({

        name: "startMenu",
        type: 'list',
        message: "What would you like to do?",
        choices: [

        "View all employees", 
        "View all roles",
        "View all departments", 
        "Update employee role",
        "Update employee manager",
        "Add employee",
        "Add role",
        "Add department"
    ]})

    .then( function (answer) {
        switch(answer.startMenu) {

            case "View all employees":
                viewAllEmployees()
            break;

            case "View all roles":
                viewAllRoles() 
            break;

            case "View all departments":
                viewAllDepartments() 
            break;

            case "Update employee role":
                updateEmployeeRole();
            break;

            case "Update employee manager":
                updateEmployeeManager();
            break;

            case "Add employee":
                addEmployee()
            break;

            case "Add role":
                addRole();
            break;

            case "Add department":
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


function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function(err, res) {

        let employeeList = [];

        for (let i = 0; i < res.length; i++) { employeeList.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name); }
  
      inquirer.prompt([

        {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: employeeList
        },
        {
            type: "list",
            name: "newRole",
            message: "Choose the new role for the employee.",
            choices: selectRole()          
        }

        ])

        .then(function(res) {

         console.log("Updating...", res);
          
          const newId = {};

          newId.employeeId = parseInt(res.employee.split(" ")[0]);

          if      (res.newRole === "Quarterback") { newId.role_id = 1; }

          else if (res.newRole === "Running Back") { newId.role_id = 2; }

          else if (res.newRole === "Long Snapper") { newId.role_id = 3; }

          else if (res.newRole === "Head Coach") { newId.role_id = 4; }

          else if (res.newRole === "Assistant Coach") { newId.role_id = 5; }

          else if (res.newRole === "Safety") { newId.role_id = 6; }

          else if (res.newRole === "Lineman") { newId.role_id = 7; }

          else if (res.newRole === "Kicker") { newId.role_id = 8; }

          else {{ newId.role_id = null; }}

          connection.query("UPDATE employee SET role_id = ? WHERE id = ?",

            [newId.role_id, newId.employeeId],function(err, res) { viewAllEmployees(); beginningPrompt(); });

        });
    });
  }

  function updateEmployeeManager() {
    connection.query("SELECT * FROM employee", function(err, res) {

        let employeeList = [];

        for (let i = 0; i < res.length; i++) { employeeList.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name); }
  
      inquirer.prompt([

        {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: employeeList
        },
        {
            type: "list",
            name: "newManager",
            message: "Choose the new manager for the employee.",
            choices: selectManager()          
        }

        ])

        .then(function(res) {

         console.log("Updating...", res);
          
          const newId = {};

          newId.employeeId = parseInt(res.employee.split(" ")[0]);

          if      (res.newManager === "Blaine Allan") { newId.manager_id = 1; }

          else if (res.newManager === "Lester Friedman") { newId.manager_id = 2; }

          else {{ newId.manager_id = null; }}

          connection.query("UPDATE employee SET manager_id = ? WHERE id = ?",

            [newId.manager_id, newId.employeeId],function(err, res) { viewAllEmployees(); beginningPrompt(); });

        });
    });
  }


  function addEmployee() {
    inquirer.prompt([
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
    ])
      .then(function(res) {
        connection.query(
          "INSERT INTO employee SET ?",
        {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: null,
            manager_id: null
        },
          function(err) {if (err) throw err; console.table(res); beginningPrompt();})
      });
  }
  

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

var manager = [''];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {

    if (err) throw err; for (var i = 0; i < res.length; i++) { manager.push(res[i].first_name + " " + res[i].last_name); }})


    return manager;
}

var role = [''];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {

    if (err) throw err; for (var i = 0; i < res.length; i++) {role.push(res[i].title);}})

    return role;
}
