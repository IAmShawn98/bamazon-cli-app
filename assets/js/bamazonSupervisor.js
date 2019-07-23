// Node Packages.
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('easy-table')

// Connect to SQL Database.
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bamazon"
});

// Execute Storefront View.
productTable();

// Storefront view functionality.
function productTable() {
    // Clear the page so ascii from the previous page doesn't show up.
    console.clear();

    // Get SQL data to populate our table.
    connection.query("SELECT * FROM products", function (req, res) {

        // Bamazon Ascii Banner.
        console.log(`
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▀▀█ █▀▄▀█ █▀▀█ ▀▀█ █▀▀█ █▀▀▄   █▀▀ █░░ ░▀░ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ 
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▄▄█ █░▀░█ █▄▄█ ▄▀░ █░░█ █░░█   █░░ █░░ ▀█▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ ▀▀▀░ ▀░░▀ ▀░░░▀ ▀░░▀ ▀▀▀ ▀▀▀▀ ▀░░▀   ▀▀▀ ▀▀▀ ▀▀▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫

    ------------------------- Your Friendly Internet Storefront! ---------------------------
        `)
        // Create our new table.
        var t = new Table

        // Build storefront from our SQL data.
        res.forEach(function (product) {
            t.cell("\n")
            t.cell('Product ID', product.item_id)
            t.cell('Product Name', product.product_name)
            t.cell('Department Name', product.department_name)
            t.cell('Price', product.price)
            // t.cell('Sales', product.product_sales)
            t.cell('Quantity', product.stock_quantity)

            // Execute Build.
            t.newRow()
        });
        // Populate CLI with our SQL datatable.
        console.log(" ╔═══════════════════════════════ SUPERVISOR STOREFRONT VIEW ══════════════════════════════════════╗");
        console.log(t.toString());
        console.log(" ╚═════════════════════════════════════════════════════════════════════════════════════════════════╝\n");
        console.log("                                       ( © A Thing By Shawn 2019 )\n                                  ");

        // Execute Options for the Supervisor.
        supervisorConsole();
    });
}

// Supervisor Console Functionality.
function supervisorConsole() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "dataOptions",
                message: "Supervisor Options: What would you like to do? Select from the options below.",
                choices: ["View Product Sales by Department", "Create New Department"]
            }
        ])
        // Depending on what the user selects, go to desired functionality.
        .then(function (select) {
            switch (select.dataOptions) {
                case "View Product Sales by Department":
                    viewDepartmentSales();
                    break;
                case "Create New Department":
                    createDepartments();
                    break;
            }
        });
}

// View Department Sales Functionality.
function viewDepartmentSales() {
    console.clear();
    connection.query("SELECT * FROM departments;", function (err, res) {
        var t = new Table

        // Build storefront from our SQL data.
        res.forEach(function (product) {
            t.cell("\n")
            t.cell("Department ID", product.department_id)
            t.cell("Overhead Costs", product.department_name)
            t.cell("Product Sales", product.product_sales)
            t.cell("Profit", product.profit)

            // Execute Build.
            t.newRow()
        });

        // Bamazon Ascii Banner.
        console.log(`
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▀▀█ █▀▄▀█ █▀▀█ ▀▀█ █▀▀█ █▀▀▄   █▀▀ █░░ ░▀░ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ 
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▄▄█ █░▀░█ █▄▄█ ▄▀░ █░░█ █░░█   █░░ █░░ ▀█▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ ▀▀▀░ ▀░░▀ ▀░░░▀ ▀░░▀ ▀▀▀ ▀▀▀▀ ▀░░▀   ▀▀▀ ▀▀▀ ▀▀▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫

    ------------------------- Your Friendly Internet Storefront! ---------------------------
                    `)
        // Populate CLI with our SQL datatable.
        console.log(" ╔══════════════════════════════ SUPERVISOR PRODUCT SALES VIEW ════════════════════════════════════╗");
        // console.log(t.toString());
        console.log("                    This is where supervisors will view department sales from.")
        console.log(" ╚═════════════════════════════════════════════════════════════════════════════════════════════════╝\n");
        console.log("                                ( © A Thing By Shawn 2019 )\n                                  ");
    });
}

// View Department Sales Functionality.
function createDepartments() {
    console.clear();
    console.log("This is where users will be able to create new departments.");
}