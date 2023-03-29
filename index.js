const inquirer = require("inquirer");
require("console.table");

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

function askUser() {
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
          "Update Role",
          "View All Departments",
          "Add Department",
          "Quit",
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
        case "Update Role":
          updateRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        default:
          console.log("Quit");
      }
    });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", (err, employee) => {
    if (err) {
      console.log(err);
    }
  });
  console.table(employee);
  askUser();
}

//View department
function viewEmployeesByDepartment() {
  db.query("SELECT * FROM department", (err, department) => {
    if (err) {
      console.log(err);
    }
  });
  console.table(department);
  askUser();
}

//Adding a new employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message:
          "What is the first name of the employee you would like to add?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee you would like to add?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID of this employee?",
      },
      {
        type: "list",
        name: "manager",
        message: "Is this employee a manager?",
        choices: ["yes", "no"],
      },
    ])
    .then((emp) => {
      if (emp.manager === "yes") {
        //delete a key value from an object
        delete emp.manager;
        db.query("INSERT INTO employee SET ?", emp, (err) => {
          if (err) {
            console.log(err);
          }
        });
        console.log("The data is added!");
        askUser(); //Ask the user again
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              name: "manager_id",
              message: "what is the ID of the manager for this employee?",
            },
          ])
          .then((res) => {
            delete emp.manager;
            let newEmployee = {
              ...emp,
              ...res,
            };
            db.query("INSERT INTO employee SET ?", newEmployee, (err) => {
              if (err) {
                console.log(err);
              }
            });
            console.log("The data is added!");
            askUser(); //Ask the user again
          });
      }
    });
}
//Adding a new role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role you would like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department ID of this role?",
      },
    ])
    .then((res) => {
      db.query("INSERT INTO role SET ?", res, (err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log("The data is added!");
      askUser(); //Ask the user again
    });
}

//Updating a new role
function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "What is the id id of the employee you would like to update?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the id of the role?",
      },
    ])
    .then((res) => {
      let newRole = {
        role_id: res.role_id,
      };

      db.query(`UPDATE employee SET ? WHERE id=${res.id} `, newRole, (err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log("The data is added!");
      askUser(); //Ask the user again;
    });
}

//Adding a new department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department you would like to add?",
      },
    ])
    //? means anything comes next
    .then((name) => {
      db.query("INSERT INTO department SET ?", name, (err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log("The data is added!");
      askUser(); //Ask the user again
    });
}

askUser();
