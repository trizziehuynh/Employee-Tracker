
drop database if exists employeeTracker_db;

create database employeeTracker_db;

use employeeTracker_db;
create table department(
id int primary key not null,
name varchar(30) not null
);

use employeeTracker_db;
create table role(
id int primary key not null,
title varchar(30) not null,
salary decimal not null,
department_id int not null,
FOREIGN KEY (department_id)
REFERENCES department(id)
);

use employeeTracker_db;
create table employee(
id int primary key not null,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null,
manager_id int not null,
foreign key (role_id)
references role(id),
foreign key (manager_id) references employee(id)
);
