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
let queryStr = "SELECT employees.first_name,employees.last_name,roles.title,roles.salary" +
    " FROM employees INNER JOIN roles ON employees.role_id = roles.id";
inquirer.prompt(questions.questionInit).then(function (answer) {
    let choice = answer.userAction;
    switch (choice) {
        case "View All Minions":
            connection.connect(function (err) {
                if (err) throw err;
                connection.query(queryStr, function (err, results) {
                    if (err) throw err;
                    console.log(results);
                    connection.end();
                });
            });
            break;

        case "View All Minions by Master":
            connection.connect(function (err) {
                if (err) throw err;
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
                            "SELECT employees.first_name,employees.last_name" +
                            " FROM employees INNER JOIN managers" +
                            " ON employees.manager_id=managers.id " +
                            "WHERE managers.last_name =?", lastName, function (err, result) {
                                if (err) throw err;
                                console.log(result);
                                connection.end();
                            });
                    });
                });
            });
            break;
        case "view All Minions by Branding":
            connection.connect(function (err) {
                if (err) throw err;
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
                                connection.end();
                            });
                    });
                });
            });
            break;
        case "Add New Minion":
            connection.connect(function (err) {
                if (err) throw err;
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
                                role_id:index,
                                manager_id:jndex
                            }, function (err, res) {
                                if (err) throw err;
                                console.log("Minions added :" + newFirstName +" "+ newLastName);
                                connection.end();
                            });
                        });
                    });
                });
            });

            break;
        case "Dispose of Minion":
            connection.connect(function (err) {
                if (err) throw err;
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
                            connection.end();
                        });
                    });
                });
            });

            break;
        case "Minion Re-branding":
            break;
        case "Minion Ownership Change":
            break;
    }
});
