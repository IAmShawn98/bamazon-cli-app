-- Execute tables using the 'bamazon' SQL DB. --
USE bamazon;

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
    over_head_costs VARCHAR(100) NULL,
    PRIMARY KEY (department_id)
);

-- Select 'products' DataTable --
SELECT * FROM products;

-- Select 'departments' DataTable --
SELECT * FROM departments;