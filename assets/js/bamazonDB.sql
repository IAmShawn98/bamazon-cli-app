-- Uncomment and execute line '2' to start fresh if needed! --
-- DROP DATABASE IF EXISTS bamazon; --
-- CREATE and USE our Bamazon DATABASE --
CREATE DATABASE bamazon;
USE bamazon;

-- Creates the Bamazon Datatable --
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price decimal(10,20) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);
-- Select 'Bamazon' DataTable --
SELECT * FROM products;

-- Execute any of the lines below to replenish DB item stock units when needed --
UPDATE products SET stock_quantity = "18" WHERE item_id = 1;
UPDATE products SET stock_quantity = "0" WHERE item_id = 2;
UPDATE products SET stock_quantity = "48" WHERE item_id = 3;
UPDATE products SET stock_quantity = "25" WHERE item_id = 4;
UPDATE products SET stock_quantity = "27" WHERE item_id = 5;
UPDATE products SET stock_quantity = "4" WHERE item_id = 6;
UPDATE products SET stock_quantity = "35" WHERE item_id = 7;
UPDATE products SET stock_quantity = "13" WHERE item_id = 8;
UPDATE products SET stock_quantity = "8" WHERE item_id = 9;
UPDATE products SET stock_quantity = "21" WHERE item_id = 10;