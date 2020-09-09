DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department (
    ID INT UNASSIGNED Auto_Increment Primary KEY,
    DeptName VARCHAR(30)
);

CREATE TABLE employeeRole (
    ID INT PRIMARY KEY,
    Title VARCHAR(30),
    Salary DECIMAL(10,2),
    DepartmentID INT
);

CREATE TABLE employee (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    RoleID INT,
    ManagerID INT NULL
);
