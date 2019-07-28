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
            // t.cell('Product Sales', product.product_sales)
            t.cell('Quantity', product.stock_quantity)

            // Execute Build.
            t.newRow()
        });
        // Populate CLI with our SQL datatable.
        console.log(" ╔═══════════════════════════════════════════ SUPERVISOR STOREFRONT VIEW ════════════════════╗");
        console.log(t.toString());
        console.log(" ╚═══════════════════════════════════════════════════════════════════════════════════════════╝\n");
        console.log("                                       ( © A Thing By Shawn 2019 )\n                            ");

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
                choices: ["View Product Profits by Department", "Create New Department"]
            }
        ])
        // Depending on what the user selects, go to desired functionality.
        .then(function (select) {
            switch (select.dataOptions) {
                case "View Product Profits by Department":
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
    // Clear Ascii and query select our departments table and mege product sales with departments, then calculate profits for display.
    console.clear();
    connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, SUM(IFNULL ( p.product_sales, 0.00)) AS product_sales, SUM(IFNULL ( p.product_sales, 0.00)) - d.over_head_costs AS total_profit FROM products p RIGHT JOIN departments d ON p.department_name = d.department_name GROUP BY d.department_id, d.department_name, d.over_head_costs;", function (err, res) {
        
        // Create our new table.
        var t = new Table

        // Build storefront from our SQL data.
        res.forEach(function (product) {
            t.cell("\n")
            t.cell("Department ID", product.department_id)
            t.cell("Department Name", product.department_name)
            t.cell("Overhead Costs", product.over_head_costs)
            t.cell("Product Sales", product.product_sales)
            t.cell("Profit", product.total_profit)

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
        console.log(t.toString());
        console.log(" ╚═════════════════════════════════════════════════════════════════════════════════════════════════╝\n");
        console.log("                                ( © A Thing By Shawn 2019 )\n                                  ");

        // Execute Options for the Supervisor.
        supervisorConsole();
    });
}

// View Department Sales Functionality.
function createDepartments() {
    console.clear();
    connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, SUM(IFNULL ( p.product_sales, 0.00)) AS product_sales, SUM(IFNULL ( p.product_sales, 0.00)) - d.over_head_costs AS total_profit FROM products p RIGHT JOIN departments d ON p.department_name = d.department_name GROUP BY d.department_id, d.department_name, d.over_head_costs;", function (err, res) {
        var t = new Table

        // Build storefront from our SQL data.
        res.forEach(function (product) {
            t.cell("\n")
            t.cell("Department ID", product.department_id)
            t.cell("Department Name", product.department_name)
            t.cell("Overhead Costs", product.over_head_costs)
            t.cell("Product Sales", product.product_sales)
            t.cell("Profit", product.total_profit)

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
        console.log(t.toString());
        console.log(" ╚═════════════════════════════════════════════════════════════════════════════════════════════════╝\n");
        console.log("                                ( © A Thing By Shawn 2019 )\n                                  ");

        // Create New Department.
        console.log("! Create New Department: \n");
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "department_name",
                    message: "Type a name for your new department:"
                },
                {
                    type: "input",
                    name: "over_head_costs",
                    message: "Enter the over head cost for this department:"
                }
            ])
            // Depending on what the user selects, go to desired functionality.
            .then(function (addDepartment) {
                // Query insert new department into supervisor view.
                connection.query("INSERT INTO departments SET ?", {
                    department_name: addDepartment.department_name,
                    over_head_costs: addDepartment.over_head_costs
                });

                // Clear ascii and Goto department sales view.
                console.clear();
                viewDepartmentSales();
            });
    });
}