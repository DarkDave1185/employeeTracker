USE employeeTracker_DB;

/*department*/
insert into department (ID, DeptName) Values (1, 'Development Dept.');

insert into department (ID, DeptName) Values (2, 'Finanacial Dept.');

insert into department (ID, DeptName) Values (3, 'Marketing Dept.');

insert into department (ID, DeptName) Values (4, 'Managerial Dept.');

/*employeeRole*/
insert into employeeRole (ID, Title, Salary, DepartmentID) values (1, 'Developer', 50000, 1);

insert into employeeRole (ID, Title, Salary, DepartmentID) values (2, 'Accountant', 20000, 2);

insert into employeeRole (ID, Title, Salary, DepartmentID) values (3, 'Marketing', 30000, 3);

insert into employeeRole (ID, Title, Salary) values (4, 'Manager', 40000);

/*employee*/
INSERT INTO employee (ID, FirstName, LastName, RoleID, ManagerID) VALUES (10, 'Dan', 'James', 1, 5);

INSERT INTO employee (ID, FirstName, LastName, RoleID, ManagerID) VALUES (11, 'Melvin', 'James', 1, 5);

INSERT INTO employee (ID, FirstName, LastName, RoleID, ManagerID) VALUES (12, 'Jonai', 'James', 2, 6);

INSERT INTO employee (ID, FirstName, LastName, RoleID, ManagerID) VALUES (13, 'Samantha', 'James', 2, 6);

INSERT INTO employee (ID, FirstName, LastName, RoleID, ManagerID) VALUES (14, 'Erika', 'James', 3, 7);

INSERT INTO employee (ID, FirstName, LastName, RoleID, ManagerID) VALUES (15, 'David', 'James', 3, 7);

INSERT INTO employee (ID, FirstName, LastName, RoleID) VALUES (20, 'Justin', 'Smith', 4);

INSERT INTO employee (ID, FirstName, LastName, RoleID) VALUES (21, 'April', 'Smith', 4);

INSERT INTO employee (ID, FirstName, LastName, RoleID) VALUES (22, 'Evelyn', 'Smith', 4);

select * from employee;