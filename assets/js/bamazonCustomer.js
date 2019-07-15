// Node Packages.
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')

// Connect to SQL Database.
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bamazon"
});

// Execute Storefront View.
productTable();

// Show the customer all products currently in stock.
function productTable() {
    // Each time the view is executed, clear the CLI to avoid duplicate views from past executions.
    console.clear();
    // Use our SQL products table.
    connection.query("SELECT * FROM products", function (err, response) {
        // Catch any errors.
        if (err) throw err;

        // Create our new table.
        var t = new Table

        // Build storefront from our SQL data.
        response.forEach(function (product) {
            t.cell('Product ID', product.item_id)
            t.cell('Product Name', product.product_name)
            t.cell('Department Name', product.department_name)
            t.cell('Price', product.price)
            t.cell('Quantity', product.stock_quantity)

            // Execute Build.
            t.newRow()
        });

        // Populate CLI with our SQL datatable.
        console.log(t.toString());
        // Ask the customer for the 'Product ID' of the item they wish to purchase.
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "item_id",
                    message: "What is the 'Product ID' of the item you'd like to purchase?"
                }
            ])
            .then(answers => {
                // Use user feedback for... whatever!!
            });

        // Close Connection.
        connection.end();
    });
}