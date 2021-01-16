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
    startingPrompt();
  });
  

function startingPrompt() {
    inquirer.prompt({
        name: "startMenu",
        type: 'list',
        message: "What would you like to do?",
        choices: [

        "View All Employees?", 
        "View All Employee's By Roles?",
        "View all Emplyees By Deparments", 
        "Update Employee",
        "Add Employee?",
        "Add Role?",
        "Add Department?"]
    })
    .then((answer) => {
        switch(answer.action) {
            case "View all employees?":
                viewAllEmployees()
            break;

            case "View all employees by role?":
                viewAllRoles() 
            break;

            case "View all employees by department?":
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

    inquirer.prompt({


    });
    
};


function viewAllRoles() {

};

function viewAllDepartments() {

};

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