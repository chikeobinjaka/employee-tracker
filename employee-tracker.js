const fs = require("fs");
const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql");
const readEachLineSync = require("read-each-line-sync");
const util = require("util");

let config = {
  host: process.env.DB_HOST | "localhost",
  port: process.env.DB_PORT | 3306,
  user: process.env.DB_USER | "bootcamp",
  password: process.env.DB_PWD | "bootcamp",
  database: process.env.DB_SERVER | "employee_TrackerDB",
};
