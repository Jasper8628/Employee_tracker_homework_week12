
INSERT INTO department(department_id) VALUES("Legal");
INSERT INTO department(department_id) VALUES("Engineering");
INSERT INTO department(department_id) VALUES("Sales");
INSERT INTO department(department_id) VALUES("Finance");
INSERT INTO roles(title,salary,department_id)
VALUES("Sales Lead",120000,3);
INSERT INTO roles(title,salary,department_id)
VALUES("Salesperson",100000,3);
INSERT INTO roles(title,salary,department_id)
VALUES("Lead Engineer",150000,2);
INSERT INTO roles(title,salary,department_id)
VALUES("Software Engineer ",125000,2);
INSERT INTO roles(title,salary,department_id)
VALUES("Accountant ",110000,4);
INSERT INTO roles(title,salary,department_id)
VALUES("Legal Lead",180000,1);
INSERT INTO roles(title,salary,department_id)
VALUES("Lawyer ",150000,1);

INSERT INTO employees(first_name,last_name,role_id,manager)
VALUES("Dick","Dickson",3,1);
INSERT INTO employees(first_name,last_name,role_id,manager)
VALUES("Jack","Asston",6,1);
INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES("John","Doe",1,2);
INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES("Mike","Chan",2,2);
INSERT INTO employees(first_name,last_name,role_id,manager)
VALUES("Ashley","Rodriguez",1,1);
INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES("Kevin","Tupik",4,3);
INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES("Malia","Brown",3,2);
INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES("Sarah","Lourd",5,3);
INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES("Tom","Allen",4,1);