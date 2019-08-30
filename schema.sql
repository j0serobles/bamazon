DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id              INT NOT NULL AUTO_INCREMENT,
  product_name    VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price           FLOAT,
  stock_qty       INTEGER,
  product_sales   FLOAT
  PRIMARY KEY (id)
);

alter table products alter  product_sales set default 0;

INSERT INTO products 
VALUES
(1, 'Dell 21-Inch LCD Monitor', 'Computer Hardware', 49.95, 4,0), 
(2, 'Logitech Mouse', 'Computer Hardware', 9.95, 25,0), 
(3, 'Windows7 Home Edition', 'Computer Software', 10.95, 1,0), 
(4, 'Single Burner Camping Stove', 'Camping Supplies', 30.95, 3,0), 
(5, '10-Pack Duracell Batteries Size D', 'Electronics', 23.22, 4,0), 
(6, 'Epson WF-3720 Printer', 'Computer Hardware', 69.95, 1,0), 
(7, 'Nutella 4oz Bottle', 'Groceries', 2.33, 5,0), 
(8, 'Gators T-Shirt', 'Clothing', 9.95, 4,0), 
(9, 'Calvin Klein 3-Pack Briefs', 'Clothing', 6.99, 8,0), 
(10, '2016 Toyora Corolla S Type', 'Auto', 17995, 1,0); 

select * from products; 

update products set product_sales = 0;

CREATE TABLE departments (
  department_id              INT NOT NULL AUTO_INCREMENT,
  department_name    VARCHAR(100) NOT NULL,
  overhead_costs     FLOAT,
  PRIMARY KEY (department_id)
);


