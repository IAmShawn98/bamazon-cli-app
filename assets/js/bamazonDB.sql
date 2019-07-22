-- Uncomment and execute line '2' to start fresh if needed! --
DROP DATABASE IF EXISTS bamazon;
-- CREATE and USE our Bamazon DATABASE --
CREATE DATABASE bamazon;
USE bamazon;

-- Creates the Bamazon Datatable --
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price decimal(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);
-- Select 'Bamazon' DataTable --
SELECT * FROM products;