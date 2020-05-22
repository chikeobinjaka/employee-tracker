const inqMod = require("./inquirer-module");
const inquirer = require("inquirer");

function viewAllEmployees(connection) {
  console.log("Running viewAllEmployees");
}
function addEmployees(connection) {
  console.log("Running addEmployees");
}
function viewEmployeeByDepartment(connection) {
  console.log("Running viewEmployeeByDepartment");
}
function viewEmployeeByManager(connection) {
  console.log("Running viewEmployeeByManager");
}
function removeEmployee(connection) {
  console.log("Running removeEmployee");
}
function updateEmployeeRole(connection) {
  console.log("Running updateEmployeeRole");
}
function updateEmployeeManager(connection) {
  console.log("Running updateEmployeeManager");
}
function viewRoles(connection) {
  console.log("Running viewRoles");
}
function defineRole(connection) {
  console.log("Running defineRole");
}
function createDepartment(connection) {
  console.log("Running createDepartment");
  //   inquirer.prompt(inqMod.CREATE_DEPARTMENT_QUESTIONS).then(function (answer) {
  //     console.log(answer);
  //     // add new row to department table
  //     connection.query(`insert into department (name) value ("${answer.name}")`, function (err, res) {
  //       if (err) throw err;
  //       console.log(`\nSuccessfully created department "${answer.name}"\n`);
  //       main.getTask();
  //     });
  //   });
}
function exitApplication(connection) {
  console.log("Running exitApplication");
  //   process.exit(1);
}

function getTask(connection) {
  inquirer.prompt(inqMod.TASK_QUESTION).then(function (answer) {
    console.log(answer);
    console.log(inqMod.TASK_CHOICES_FUNC);
    var func = inqMod.TASK_CHOICES_FUNC[answer.task];
    console.log(func);
    // if (!func) {
    //   console.log("ERROR!! Invalid choice");
    //   getTask();
    // }
    // func(connection);
  });
}

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
  exitApplication,
  getTask,
};
