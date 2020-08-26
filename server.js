const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const choices = require('inquirer/lib/objects/choices');



// DB Connection 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: "done",
    database: 'employeeTracker_DB'
});


// Questions
function start() {
    inquirer.prompt({
        name: 'menu',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: ['View Departments, Roles and Employees', 'Add a Department, Role or Employee']
    }).then(function(answer) {
        console.log(answer)
        if (answer.menu === 'View Departments, Roles and Employees') {
            console.log("answer")
            return choiceOne();
        } else if (answer.main_menu === 'Add a Department, Role or Employee') {
            return choiceTwo();
        };
    });
}

function choiceOne() {
    inquirer.prompt({
        name: 'addlist',
        type: 'rawlist',
        message: 'Please select the option you would like to see',
        choices: ['Departments', 'Employee Roles', 'Employees', 'Return']
    }).then(function(answer) {
        console.log(answer.addlist)
        if (answer.addlist == 'Departments') {
            console.log("Departments")
            connection.query('SELECT * FROM department', (err, results) => {
                if (err) throw err;
                console.table(results);
                choiceOne();
            })
        } else if (answer.addlist === 'Employee Roles') {
            connection.query('SELECT * FROM employeeRole', (err, results) => {
                if (err) throw err;
                console.table(results);
                choiceOne();
            })
        } else if (answer.addlist === 'Employees') {
            console.log("employee")
            connection.query('SELECT * FROM employee', (err, results) => {
                if (err) throw err;
                console.table(results);
                choiceOne();
            })
        } else if (answer.addlist === 'Return') {
            return start();
        }
    })
}

function choiceTwo() {
    inquirer.prompt({
        name: 'add',
        type: 'rawlist',
        message: 'Please select the category you would like to add data to',
        choices: ['Departments', 'Role', 'Employee', 'Return']
    }).then(function(answer) {
        if (answer.add === 'Departments') {
            inquirer.prompt({
                name: 'dept',
                type: 'rawlist',
                message: 'Choose a new Department',
                choices: ['Human Resources', 'Custodial', 'Manager', 'Retention']
            }).then(function(answer) {
                let dept = answer.dept;
                connection.query('INSERT INTO department (DeptName) VALUES (?)', [dept], (err, results) => {
                    if (err) throw err;
                    if (!err) {
                        console.table(results);
                        connection.query('Select * FROM department', (err, results) => {
                            if (err) throw err;
                            console.table(results)
                            choiceTwo();
                        })
                    } else {
                        throw err
                    }
                })
            })
        } else if (answer.add === 'Role') {
            inquirer.prompt({
                name: 'role',
                type: 'input',
                message: 'Add a new Employee Role (title)'
            }).then(function(answer) {
                let role = answer.role;
                connection.query('INSERT INTO employeeRole (Title) VALUES (?)', [role], (err, results) => {
                    if (err) throw err;
                    inquirer.prompt({
                        name: 'salary',
                        type: 'number',
                        message: 'Add Yearly Salary'
                    }).then(function(answer) {
                        connection.query('UPDATE employeeRole SET Salary = ? where title =?', [answer.salary, role], (err, results) => {
                            if (err) throw err;
                            // console.table(results)
                        })
                        inquirer.prompt({
                            name: 'dept_ID',
                            type: 'number',
                            message: 'Select Department ID'
                        }).then(function(answer) {
                            connection.query('UPDATE employeeRole SET DepartmentID = ? where title =?', [answer.dept_ID, role], (err, results) => {
                                if (err) throw err
                                connection.query('SELECT * FROM employeeRole', (err, results) => {
                                    if (err) throw err;
                                    console.table(results)
                                    choiceTwo();
                                })
                            })
                        })
                    })
                }, )
            })
        } else if (answer.add === 'Employee') {
            inquirer.prompt([{
                    name: 'first',
                    type: 'input',
                    message: 'Please Enter New Employees first Name.'
                },
                {
                    name: 'last',
                    type: 'input',
                    message: 'Enter Last Name.'
                },
                {
                    name: 'role',
                    type: 'number',
                    message: 'Enter Role ID.'
                },
            ]).then(function(answer) {
                console.log(answer);
                connection.query('INSERT INTO employee (FirstName, LastName, RoleID) VALUES (?,?,?)', [answer.first, answer.last, answer.role], (err, results) => {
                    if (err) throw err;
                    connection.query('SELECT FirstName, LastName FROM employee', (err, results) => {
                        if (err) throw err;
                        console.table(results)
                        choiceTwo();
                    })
                })
            })
        } else if (answer.add === 'Return') {
            return start();
        }
    })
}

connection.connect(function(err) {
    if (err) {
        return err
    }
    console.log(' the server is running ');
    start();
})