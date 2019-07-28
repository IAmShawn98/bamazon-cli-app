-- Execute tables using the 'bamazon' SQL DB. --
USE bamazon;

-- DROP TABLES IF EXISTS products --;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS products;

-- Creates the 'products' Datatable --
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    product_sales DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

-- Creates the 'departments' Datatable --
CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NULL,
    over_head_costs DECIMAL(10,2) NULL,
    PRIMARY KEY (department_id)
);

-- Select 'products' DataTable --
SELECT * FROM products;

-- Select 'departments' DataTable --
SELECT * FROM departments;

-- Display Departments Table Including the Sales and Profits Calculation --
SELECT 
d.department_id,
d.department_name,
d.over_head_costs,
SUM(IFNULL ( p.product_sales, 0.00)) AS product_sales, 
SUM(IFNULL ( p.product_sales, 0.00)) - d.over_head_costs AS total_profit
FROM products p
RIGHT JOIN departments d ON p.department_name = d.department_name
GROUP BY
d.department_id,
d.department_name,
d.over_head_costs;

-- INSERT TABLE DATA --
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home & Kitchen", 250.21);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Appliances", 760.22);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Games & DVDs", 500.12);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Vehicles", 900.12);