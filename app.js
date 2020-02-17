var mysql = require("mysql");
var inquirer = require("inquirer");
let questions = require("./questions.js");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Antares28",
    database: "employee_tracker_db"
});
let minions = [];
let managers = [];
let roles = [];
let queryStr = "SELECT employees.first_name AS e_fn,employees.last_name AS e_ln,roles.title,roles.salary," +
    "department.department_id,managers.first_name AS m_fn,managers.last_name AS m_ln " +
    "FROM employees " +
    "INNER JOIN roles " +
    "ON  roles.id = employees.role_id " +
    "LEFT JOIN managers " +
    "ON managers.id = employees.manager_id " +
    "INNER JOIN department " +
    "ON roles.department_id = department.id";

connection.connect(function (err) {
    if (err) throw err;
});

function viewAll() {
    connection.query(queryStr, function (err, results) {
        if (err) throw err;
        console.log("-".repeat(130));
        console.log("First Name" + " ".repeat(10) + "Last Name" + " ".repeat(11) + "Role" + " ".repeat(26) +
            "Department" + " ".repeat(15) + "Salary" + " ".repeat(14) + "Manager");
        console.log("-".repeat(130));
        for (entry of results) {
            let space = 30;
            let num = entry.e_fn.split("").length;
            let num2 = entry.e_ln.split("").length;
            let num3 = entry.title.split("").length;
            let num4 = entry.department_id.split("").length;
            console.log(entry.e_fn + " ".repeat(space - num - 10) +
                entry.e_ln + " ".repeat(space - num2 - 10) +
                entry.title + " ".repeat(space - num3) +
                entry.department_id + " ".repeat(space - num4 - 5) + entry.salary + " ".repeat(14) + entry.m_fn + " " + entry.m_ln);

        }
        console.log("-".repeat(130));
        inquirer.prompt({
            "type": "list",
            "name": "continue",
            "message": "Continue?",
            "choices": ["yes", "no"]
        }).then(function (answer) {
            if (answer.continue == "yes") {
                start();
            }
            else {
                connection.end();
            }
        });
    });
}
function viewByMng() {
    connection.query("SELECT * FROM managers", function (err, results) {
        if (err) throw err;
        for (entry of results) {
            let name = entry.first_name + " " + entry.last_name;
            managers.push(name);
        }
        let select = {
            "type": "list",
            "name": "name",
            "message": "Choose a master: ",
            "choices": managers
        };
        inquirer.prompt(select).then(function (answer) {
            let fullName = answer.name.split(" ");
            let lastName = fullName[1];
            connection.query(
                "SELECT employees.first_name AS e_fn,employees.last_name AS e_ln," +
                "roles.title,roles.salary,department.department_id " +
                " FROM employees INNER JOIN managers" +
                " ON  managers.id = employees.manager_id " +
                "INNER JOIN roles " +
                "ON roles.id = employees.role_id " +
                "INNER JOIN department " +
                "ON department.id = roles.department_id " +
                "WHERE managers.last_name =?", lastName, function (err, result) {
                    if (err) throw err;
                    console.log("-".repeat(101));
                    console.log("First Name" + " ".repeat(10) + "Last Name" + " ".repeat(11) + "Role" + " ".repeat(26) +
                        "Department" + " ".repeat(15) + "Salary");
                    console.log("-".repeat(101));
                    for (entry of result) {
                        let space = 30;
                        let num = entry.e_fn.split("").length;
                        let num2 = entry.e_ln.split("").length;
                        let num3 = entry.title.split("").length;
                        let num4 = entry.department_id.split("").length;
                        console.log(entry.e_fn + " ".repeat(space - num - 10) +
                            entry.e_ln + " ".repeat(space - num2 - 10) +
                            entry.title + " ".repeat(space - num3) +
                            entry.department_id + " ".repeat(space - num4 - 5) + entry.salary);
                    }
                    console.log("-".repeat(101));
                    inquirer.prompt({
                        "type": "list",
                        "name": "continue",
                        "message": "Continue?",
                        "choices": ["yes", "no"]
                    }).then(function (answer) {
                        if (answer.continue == "yes") {
                            start();
                        }
                        else {
                            connection.end();
                        }
                    });
                });
        });
    });
}
function viewByRole() {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        for (entry of results) {
            let title = entry.title;
            roles.push(title);
        }
        let select = {
            "type": "list",
            "name": "name",
            "message": "Choose a role: ",
            "choices": roles
        };
        inquirer.prompt(select).then(function (answer) {
            let newTitle = answer.name;
            connection.query(
                "SELECT employees.first_name,employees.last_name" +
                " FROM employees INNER JOIN roles" +
                " ON employees.role_id=roles.id " +
                "WHERE roles.title =?", newTitle, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    start();
                });
        });
    });
}
function addNew() {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        roles = [];
        for (entry of results) {
            let title = entry.title;
            roles.push(title);
        };
        connection.query("SELECT * FROM managers", function (err, newResults) {
            if (err) throw err;
            managers = [];
            for (entry of newResults) {
                let title = entry.first_name + " " + entry.last_name;
                managers.push(title);
            };
            console.log(managers);
            let newMinion = [
                {
                    "type": "input",
                    "name": "firstName",
                    "message": "Fist name: "
                },
                {
                    "type": "input",
                    "name": "lastName",
                    "message": "last name: "
                },
                {
                    "type": "list",
                    "name": "manager",
                    "message": "Master name: ",
                    "choices": managers
                },
                {
                    "type": "list",
                    "name": "role",
                    "message": "Role: ",
                    "choices": roles
                }
            ];
            inquirer.prompt(newMinion).then(function (answers) {
                let newFirstName = answers.firstName;
                let newLastName = answers.lastName;
                let role = answers.role;
                let manager = answers.manager;
                let index = roles.indexOf(role) + 1;
                let jndex = managers.indexOf(manager) + 1;

                connection.query("INSERT INTO employees SET?", {
                    first_name: newFirstName,
                    last_name: newLastName,
                    role_id: index,
                    manager_id: jndex
                }, function (err, res) {
                    if (err) throw err;
                    console.log("Minions added :" + newFirstName + " " + newLastName);
                    start();
                });
            });
        });
    });
}
function deleteOne() {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        minions = [];
        for (entry of results) {
            let name = entry.first_name + " " + entry.last_name;
            minions.push(name);
        }
        let select = {
            "type": "list",
            "name": "name",
            "message": "Minion to dispose of: ",
            "choices": minions
        };
        inquirer.prompt(select).then(function (answer) {
            let fullName = answer.name.split(" ");
            let lastName = fullName[1];
            connection.query("DELETE FROM employees WHERE last_name=?", lastName, function (err, result) {
                if (err) throw err;
                console.log("minion disposed of: " + answer.name);
                start();
            });
        });
    });
}
function start() {
    inquirer.prompt(questions.questionInit).then(function (answer) {
        let choice = answer.userAction;
        switch (choice) {
            case "View All Minions":
                viewAll();
                break;
            case "View All Minions by Master":
                viewByMng();
                break;
            case "view All Minions by Role":
                viewByRole();
                break;
            case "Add New Minion":
                addNew();
                break;
            case "Dispose of Minion":
                deleteOne();
                break;
            case "Minion Role Change":
                break;
            case "Minion Ownership Change":
                break;
        }
    });
}
start();
