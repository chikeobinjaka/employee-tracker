const fs = require("fs");
const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql");
const readEachLineSync = require("read-each-line-sync");
const util = require("util");
const utilities = require("./utilities");

let connection = null;

let config = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "bootcamp",
  password: process.env.DB_PWD || "bootcamp",
  database: process.env.DB_DATABASE || "employee_TrackerDB",
};

// const TASK_CHOICES = [
//   "View All Employees",
//   "Add Employee",
//   "View All Employees by Department",
//   "View All Employees by Manager",
//   "Remove Employee",
//   "Update Employee Role",
//   "Update Employee Manager",
//   "View All Roles",
//   "Define New Role",
//   "Create Department",
//   "Exit Application",
// ];

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
