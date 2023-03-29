const inquirer = require("inquirer");

//Connect with the database
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "Lullaby~2660",
  database: "employeeTracker_db",
});

db.connect(function (err) {
  if (err) throw err;
});

//Inquirer/prompt
inquirer
  .prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "Add Employee",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    },
  ])
  .then((res) => {
    let userChoice = res.choice;

    switch (userChoice) {
      case "View All Employees":
        viewEmployees();
        break;
      case "View All Employees By Department":
        viewEmployeesByDepartment();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "View All Departments":
        viewDepartments();
        break;
      case "Add Department":
        addDepartment();
        break;
    }
  });

function viewEmployees() {
  console.log("you chose to view the employees");
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then((name) => {
      db.query("INSERT INTO department SET ?", name, (err) => {
        if (err) {
          console.log(err);
        }
      }); //? means anything comes next
    });
}
