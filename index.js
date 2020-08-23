const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Choices = require('inquirer/lib/objects/choices');


// DB Connection 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: "done",
    database: 'employeeTracker_DB'
});

connection.connect(function(err) {
    if (err) {
        return err
    }
    console.log(' the server is running ');
    start();
})