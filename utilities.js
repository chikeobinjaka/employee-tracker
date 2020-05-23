// const inqMod = require("./inquirer-module");
const inquirer = require("inquirer");
var util = require("util");
const readlineSync = require("readline-sync");

function viewAllEmployees(connection) {
  console.clear();
  console.log("Running viewAllEmployees");
  let query = `select * from employee`;
  connection.query(query, function (err, result) {
    if (!err) {
      console.log("\nDepartments:");
      console.log("  Emp. ID     First Name        Last Name      Role       Manager");
      console.log("  =======  ===============  =============== ==========  ==========");
      if (result.length != 0) {
        for (let index = 0; index < result.length; index++) {
          res = result[index];
          let id = ("" + res.id).padStart(7, " ");
          let fn = ("" + res.first_name).padStart(15, " ");
          let ln = ("" + res.last_name).padStart(15, " ");
          let rid = ("" + res.role_id).padStart(10, " ");
          let mid = ("" + res.manager_id).padStart(10, " ");
          console.log(`  ${id}  ${fn}  ${ln}  ${rid}  ${mid}`);
        }
      }
    }
  });
}
function addEmployees(connection) {
  console.clear();
  console.log("Running addEmployees");
}
function viewEmployeeByDepartment(connection,department) {
  console.clear();
  console.log("Running viewEmployeeByDepartment");
  if (department != null){
    let query = `select employee.first_name,employee.last_name from employee, department where employee`;
  }
}
function viewEmployeeByManager(connection) {
  console.clear();
  console.log("Running viewEmployeeByManager");
}
function removeEmployee(connection) {
  console.clear();
  console.log("Running removeEmployee");
}
function updateEmployeeRole(connection) {
  console.clear();
  console.log("Running updateEmployeeRole");
}
function updateEmployeeManager(connection) {
  console.clear();
  console.log("Running updateEmployeeManager");
}
function viewRoles(connection) {
  console.clear();
  console.log("Running viewRoles");
}
function defineRole(connection) {
  console.clear();
  console.log("Running defineRole");
}

function createDepartment(connection) {
  console.log("Running createDepartment");
  inquirer.prompt(CREATE_DEPARTMENT_QUESTIONS).then(function (answer) {
    console.log(answer);
    // add new row to department table
    let departmentName = capitalizeFirstLetter(answer.name);
    connection.query(`insert into department (name) value ("${departmentName}")`, function (err, res) {
      if (!err) {
        console.log(`\nSuccessfully created department "${answer.name}"\n`);
        getTask(connection);
      } else {
        console.log("\n\n***ERROR***\n" + err.sqlMessage + "\n");
        readlineSync.question(`Press "Enter" to continue...`);
        console.clear();
        getTask(connection);
      }
    });
  });
}

function capitalizeFirstLetter(inputString) {
  let retval = inputString;
  if (inputString != null && inputString.trim().length != 0) {
    let arrayVal = inputString.trim().replace(/  /g, " ").split(" ");
    for (let index = 0; index < arrayVal.length; index++) {
      let val = arrayVal[index].toLowerCase();
      val = val.charAt(0).toUpperCase() + val.slice(1);
      arrayVal[index] = val;
    }
    retval = arrayVal.join(" ");
  }
  return retval;
}
function viewDepartments(connection) {
  console.clear();
  let query = "select * from department";
  connection.query(query, function (err, res) {
    if (err) {
      console.log(err);
      getTask(connection);
    }
    console.log(res);
    console.log("\nDepartments:");
    console.log("  Dept. ID       Department Name");
    console.log("============     ===============");
    for (let index = 0; index < res.length; index++) {
      let id = "" + res[index].id;
      let name = "" + res[index].name;
      console.log(id.padStart(12, " "), "   ", name.padStart(15, " "));
    }
    readlineSync.question(`Press "Enter" to continue...`);
    console.clear();
    getTask(connection);
  });
}
function exitApplication(connection) {
  console.clear();
  console.log("\nThank you for using Employee Tracker. Have a good day!!\n\n");
  process.exit(1);
}

function getTask(connection) {
  inquirer.prompt(TASK_QUESTION).then(function (answer) {
    console.log(answer);
    console.log(TASK_CHOICES_FUNC);
    var func = TASK_CHOICES_FUNC[answer.task];
    console.log(func);
    if (!func) {
      console.log("ERROR!! Invalid choice");
      getTask(connection);
    }
    func(connection);
  });
}

// From inquirer-module.js
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

const TASK_CHOICES_FUNC = {
  "View All Employees": viewAllEmployees,
  "Add Employee": addEmployees,
  "View All Employees by Department": viewEmployeeByDepartment,
  "View All Employees by Manager": viewEmployeeByManager,
  "Remove Employee": removeEmployee,
  "Update Employee Role": updateEmployeeRole,
  "Update Employee Manager": updateEmployeeManager,
  "View All Roles": viewRoles,
  "Define New Role": defineRole,
  "View Departments": viewDepartments,
  "Create Department": createDepartment,
  "Exit Application": exitApplication,
};

const TASK_QUESTION = {
  name: "task",
  type: "rawlist",
  message: "What Task would you like to perform?",
  choices: Object.keys(TASK_CHOICES_FUNC),
};

const CREATE_DEPARTMENT_QUESTIONS = [
  {
    name: "name",
    type: "input",
    message: "What is the name of this NEW department? ",
  },
];

// *********************

module.exports = {
  viewAllEmployees,
  addEmployees,
  viewEmployeeByDepartment,
  viewEmployeeByManager,
  removeEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewRoles,
  defineRole,
  createDepartment,
  viewDepartments,
  exitApplication,
  getTask,
  capitalizeFirstLetter,
  TASK_CHOICES_FUNC,
};
