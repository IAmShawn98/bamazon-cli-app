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

// Initially show all storefront products.
allProducts();

// Show all products functionality.
function allProducts() {
    // Clear the console to avoid duplicate ascii tables at once.
    console.clear();

    // Select all products from the SQL DB.
    connection.query("SELECT * FROM products", function (err, res) {
        // If there is an error, handle it.
        if (err) throw err;

        // Construct a new table.
        var t = new Table;

        // Build our table using data from our SQL DB.
        res.forEach(function (product) {
            t.cell("\n");
            t.cell("Product ID", product.item_id);
            t.cell("Product Name", product.product_name);
            t.cell("Department Name", product.department_name);
            t.cell("Price", product.price);
            t.cell("Quantity", product.stock_quantity);
            // Create the table we built.
            t.newRow();
        });

        // Bamazon Ascii Banner.
        console.log(`
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▀▀█ █▀▄▀█ █▀▀█ ▀▀█ █▀▀█ █▀▀▄   █▀▀ █░░ ░▀░ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ 
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▄▄█ █░▀░█ █▄▄█ ▄▀░ █░░█ █░░█   █░░ █░░ ▀█▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ ▀▀▀░ ▀░░▀ ▀░░░▀ ▀░░▀ ▀▀▀ ▀▀▀▀ ▀░░▀   ▀▀▀ ▀▀▀ ▀▀▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫

    ------------------------- Your Friendly Internet Storefront! ---------------------------
            `)

        // Populate CLI with our SQL datatable.
        console.log(" ╔═══════════════════════════════ MANAGEMENT STOREFRONT VIEW ══════════════════════════════════════╗");
        console.log(t.toString());
        console.log(" ╚═════════════════════════════════════════════════════════════════════════════════════════════════╝\n");
        console.log("                                       ( © A Thing By Shawn 2019 )\n                                  ");

        // Display Management Options.
        managerConsole();
    });
}

// Management Options Functionality.
function managerConsole() {
    // Prompt the manager with data options.
    inquirer
        .prompt([
            {
                type: "list",
                name: "dataOptions",
                message: "Management Options: How would you like to view your data? Select from the options below.",
                choices: ["View Products for Sale", "View Low Inventory", "Add New Product", "Add Inventory",]
            }
        ])
        // Depending on what the user selects, go to desired functionality.
        .then(function (select) {
            switch (select.dataOptions) {
                case "View Products for Sale":
                    productsForSale();
                    break;
                case "View Low Inventory":
                    productsLowInventory();
                    break;
                case "Add New Product":
                    AddProducts();
                    break;
                case "Add Inventory":
                    addInventory();
                    break;
            }
        });
}

// Show item units ONLY for SALE.
function productsForSale() {
    // Clear the console to avoid duplicate ascii tables at once.
    console.clear();

    // Select SQL data from values in the table that meet the query requirements.
    connection.query("SELECT * FROM products WHERE stock_quantity > 0;", function (err, res) {
        if (err) throw err;

        // Construct a new table.
        var t = new Table;

        // Build our table.
        res.forEach(function (product) {
            t.cell("\n");
            t.cell("Product ID", product.item_id);
            t.cell("Product Name", product.product_name);
            t.cell("Department Name", product.department_name);
            t.cell("Price", product.price);
            t.cell("Quantity", product.stock_quantity);

            // Initialize our new table.
            t.newRow();
        });

        // Bamazon Ascii Banner.
        console.log(`
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▀▀█ █▀▄▀█ █▀▀█ ▀▀█ █▀▀█ █▀▀▄   █▀▀ █░░ ░▀░ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ 
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▄▄█ █░▀░█ █▄▄█ ▄▀░ █░░█ █░░█   █░░ █░░ ▀█▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ ▀▀▀░ ▀░░▀ ▀░░░▀ ▀░░▀ ▀▀▀ ▀▀▀▀ ▀░░▀   ▀▀▀ ▀▀▀ ▀▀▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫

    ------------------------- Your Friendly Internet Storefront! ---------------------------
            `)

        // Populate CLI with our SQL datatable.
        console.log(" ╔═══════════════════════════════ MANAGEMENT STOREFRONT VIEW ══════════════════════════════════════╗");
        console.log(t.toString());
        console.log(" ╚═════════════════════════════════════════════════════════════════════════════════════════════════╝\n");
        console.log("                                       ( © A Thing By Shawn 2019 )\n                                  ");

        // Display Management Options.
        console.log("                              - You are now viewing all products for sale! - \n")
        managerConsole();
    });
}

// Show products with a low inventory ONLY.
function productsLowInventory() {
    // Clear the console to avoid duplicate ascii tables at once.
    console.clear();

    // Select SQL data from values in the table that meet the query requirements.
    connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function (err, res) {
        if (err) throw err;

        // Construct a new table.
        var t = new Table;

        // Build our table.
        res.forEach(function (product) {
            t.cell("\n");
            t.cell("Product ID", product.item_id);
            t.cell("Product Name", product.product_name);
            t.cell("Department Name", product.department_name);
            t.cell("Price", product.price);
            t.cell("Quantity", product.stock_quantity);

            // Initialize our new table.
            t.newRow();
        });

        // Bamazon Ascii Banner.
        console.log(`
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▀▀█ █▀▄▀█ █▀▀█ ▀▀█ █▀▀█ █▀▀▄   █▀▀ █░░ ░▀░ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ 
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▄▄█ █░▀░█ █▄▄█ ▄▀░ █░░█ █░░█   █░░ █░░ ▀█▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ ▀▀▀░ ▀░░▀ ▀░░░▀ ▀░░▀ ▀▀▀ ▀▀▀▀ ▀░░▀   ▀▀▀ ▀▀▀ ▀▀▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫

    ------------------------- Your Friendly Internet Storefront! ---------------------------
            `)

        // Populate CLI with our SQL datatable.
        console.log(" ╔═══════════════════════════════ MANAGEMENT STOREFRONT VIEW ══════════════════════════════════════╗");
        console.log(t.toString());
        console.log(" ╚═════════════════════════════════════════════════════════════════════════════════════════════════╝\n");
        console.log("                                       ( © A Thing By Shawn 2019 )\n                                  ");

        // Display Management Options.
        console.log("                              - You are now viewing all products with low inventory! - \n");
        managerConsole();
    });
}


// Show all products functionality.
function AddProducts() {
    // Select all products from the SQL DB.
    connection.query("SELECT * FROM products", function (err, res) {
        // If there is an error, handle it.
        if (err) throw err;

        // Construct a new table.
        var t = new Table;

        // Build our table using data from our SQL DB.
        res.forEach(function (product) {
            t.cell("\n");
            t.cell("Product ID", product.item_id);
            t.cell("Product Name", product.product_name);
            t.cell("Department Name", product.department_name);
            t.cell("Price", product.price);
            t.cell("Quantity", product.stock_quantity);
            // Create the table we built.
            t.newRow();
        });
        // Prompt the manager with data options.
        console.log("--------------------------------------------------------------------------------------------------------");
        console.log("! Add A Product:")
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "product_name",
                    message: "What is the name of the product:",
                },
                {
                    type: "input",
                    name: "department_name",
                    message: "What is the department name of this product:",
                },
                {
                    type: "input",
                    name: "price",
                    message: "What is the price of this product:",
                },
                {
                    type: "input",
                    name: "stock_quantity",
                    message: "What is the stock stock quantity of this product:",
                }
            ])
            .then(function (addProducts) {
                connection.query("INSERT INTO products SET ?", {
                    product_name: addProducts.product_name,
                    department_name: addProducts.department_name,
                    price: addProducts.price,
                    stock_quantity: addProducts.stock_quantity
                });

                console.clear();

                allProducts();
            });
    });
}

// Add to Inventory Functionality.
function addInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "item_id",
                message: "Enter the 'Product ID' of the item you'd like to replenish:"
            },
            {
                type: "input",
                name: "unit_amount",
                message: "How many units of this item would you like to add:"
            }
        ])
        .then(function (select) {
            // Gets the two values from inquirer 'unit_amount && item_id'.
            connection.query("UPDATE products SET stock_quantity = stock_quantity + " + select.unit_amount + " WHERE item_id = " + select.item_id + "");
            // Go back to the manager console.
            allProducts();
        });
}