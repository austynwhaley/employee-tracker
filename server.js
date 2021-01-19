// Dependencies
var express = require("express");
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
    startingPrompt();
});
  

function startingPrompt() {
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
        "Add department?"]
    })
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
    function(err, res) {
      if (err) throw err
      console.table(res)
      startingPrompt()
  })
    
};


function viewAllRoles() {
    connection.query('SELECT * FROM role', 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startingPrompt()
    })
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department', 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startingPrompt()
    })
}

function updateEmployee() {

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
        choices:["Offense", "Defence","Special Teams","Coaching"]
    },
    {
        name:"manager",
        type:"list",
        message:"Who is the employee's manager?",
        choices:[]
    }
    );

};

function addDepartment() {

};

function addRole() {

};