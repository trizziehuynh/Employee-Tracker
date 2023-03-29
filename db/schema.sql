drop database if exists employeeTracker_db;

create database employeeTracker_db;

use employeeTracker_db;
create table department(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(30) not null
);

use employeeTracker_db;
create table role(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title varchar(30) not null,
salary decimal not null,
department_id int not null,
FOREIGN KEY (department_id)
REFERENCES department(id)
);

use employeeTracker_db;
create table employee(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null,
manager_id int,
foreign key (role_id)
references role(id),
foreign key (manager_id) references employee(id)
);