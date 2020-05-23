const fs = require("fs");
const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql");
const readEachLineSync = require("read-each-line-sync");
const util = require("util");
const utilities = require("./utilities");
// const inqMod = require("./inquirer-module");

let connection = null;

let config = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "bootcamp",
  password: process.env.DB_PWD || "bootcamp",
  database: process.env.DB_DATABASE || "employee_TrackerDB",
};

const TASK_CHOICES = [
  "View All Employees",
  "Add Employee",
  "View All Employees by Department",
  "View All Employees by Manager",
  "Remove Employee",
  "Update Employee Role",
  "Update Employee Manager",
  "View All Roles",
  "Define New Role",
  "Create Department",
  "Exit Application",
];
// const TASK_CHOICES_TEST = {
//   ViewAllEmployees: { title: "View All Employees", funct: utilities.viewAllEmployees },
//   AddEmployees: { title: "Add Employee", funct: utilities.addEmployees },
//   ViewEmployeeByDepartment: { title: "View All Employees by Department", funct: utilities.viewEmployeeByDepartment },
//   ViewEmployeeByManager: { title: "View All Employees by Manager", funct: utilities.viewEmployeeByManager },
//   RemoveEmployee: { title: "Remove Employee", funct: utilities.removeEmployee },
//   UpdateEmployeeRole: { title: "Update Employee Role", funct: utilities.updateEmployeeRole },
//   UpdateEmployeeManager: { title: "Update Employee Manager", funct: utilities.updateEmployeeManager },
//   ViewRoles: { title: "View All Roles", funct: utilities.viewRoles },
//   DefineRole: { title: "Define New Role", funct: utilities.defineRole },
//   CreateDepartment: { title: "Create Department", funct: utilities.createDepartment },
//   ExitApplication: { title: "Exit Application", funct: utilities.exitApplication },
// };

// const TASK_CHOICES_FUNC = {
//   "View All Employees": utilities.viewAllEmployees,
//   "Add Employee": utilities.addEmployees,
//   "View All Employees by Department": utilities.viewEmployeeByDepartment,
//   "View All Employees by Manager": utilities.viewEmployeeByManager,
//   "Remove Employee": utilities.removeEmployee,
//   "Update Employee Role": utilities.updateEmployeeRole,
//   "Update Employee Manager": utilities.updateEmployeeManager,
//   "View All Roles": utilities.viewRoles,
//   "Define New Role": utilities.defineRole,
//   "View Departments": utilities.viewDeaprtments,
//   "Create Department": utilities.createDepartment,
//   "Exit Application": utilities.exitApplication,
// };

const TASK_QUESTION = {
  name: "task",
  type: "rawlist",
  message: "What Task would you like to perform?",
  choices: Object.keys(utilities.TASK_CHOICES_FUNC),
};

const CREATE_DEPARTMENT_QUESTIONS = [
  {
    name: "name",
    type: "input",
    message: "What is the name of this NEW department? ",
  },
];

function initialize() {
  console.clear();
  console.log(config);
  connection = mysql.createConnection(config);
  connection.connect(function (err) {
    if (err) throw err;
    utilities.getTask(connection);
  });
}

initialize();
