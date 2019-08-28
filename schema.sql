DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id              INT NOT NULL AUTO_INCREMENT,
  product_name    VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price           FLOAT,
  stock_qty       INTEGER,
  PRIMARY KEY (id)
);

INSERT INTO products 
VALUES
(1, 'Dell 21-Inch LCD Monitor', 'Computer Hardware', 49.95, 4), 
(2, 'Logitech Mouse', 'Computer Hardware', 9.95, 25), 
(3, 'Windows7 Home Edition', 'Computer Software', 10.95, 1), 
(4, 'Single Burner Camping Stove', 'Camping Supplies', 30.95, 3), 
(5, '10-Pack Duracell Batteries Size D', 'Electronics', 23.22, 4), 
(6, 'Epson WF-3720 Printer', 'Computer Hardware', 69.95, 1), 
(7, 'Nutella 4oz Bottle', 'Groceries', 2.33, 5), 
(8, 'Gators T-Shirt', 'Clothing', 9.95, 4), 
(9, 'Calvin Klein 3-Pack Briefs', 'Clothing', 6.99, 8), 
(10, '2016 Toyora Corolla S Type', 'Auto', 17995, 1); 

select * from products; 
