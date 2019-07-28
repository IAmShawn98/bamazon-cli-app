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

-- INSERT TABLE DATA (FOR DEPARTMENTS) --
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home & Kitchen", 250.21);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Appliances", 760.22);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Games & DVDs", 500.12);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Vehicles", 900.12);

-- INSERT TABLE DATA (FOR PRODUCTS) --
INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Wall Decal of Senior Citizens", "Home & Kitchen", 8.28, 85);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Desktop Refrigerator", "Appliances", 28.25, 75);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Dancing With Cats", "Games & DVDs", 13.22, 65);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("2003 Ford Windstar", "Vehicles", 300.27, 4);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Heavy Tub of Lard", "Food", 15.97, 40);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Acrylic Paint", "Art Supplies", 1.05, 2);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Roast Beef Bath Soak", "Personal Care", 17.95, 20);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Pigeon Mask", "Fashion", 27.48, 55);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Nothing", "Something", 0.01, 0);

INSERT INTO departments (product_name, department_name, price, stock_quantity)
VALUES ("Something", "Nothing", 1.11, 1);