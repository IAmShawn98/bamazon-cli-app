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

allProducts();

function allProducts() {
    console.clear();

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var t = new Table;

        res.forEach(function (product) {
            t.cell("\n");
            t.cell("  Product ID", product.item_id);
            t.cell("  Product Name", product.product_name);
            t.cell("  Department Name", product.department_name);
            t.cell("  Price", product.price);
            t.cell("  Quantity", product.stock_quantity);
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

        managerConsole();
    });
}

function managerConsole() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "dataOptions",
                message: "Manager Console: How would you like to view your data? Select from the options below.",
                choices: ["View Products for Sale", "View Low Inventory", "Add Inventory", "Add New Product"]
            }
        ])
        .then(function (select) {
            switch (select.dataOptions) {
                case "View Products for Sale":
                    productsForSale();
                    break;
            }
        });
}

function productsForSale() {
    console.clear();

    connection.query("SELECT * FROM products WHERE stock_quantity > 0;", function (err, res) {
        if (err) throw err;

        var t = new Table;

        res.forEach(function (product) {
            t.cell("\n");
            t.cell("  Product ID", product.item_id);
            t.cell("  Product Name", product.product_name);
            t.cell("  Department Name", product.department_name);
            t.cell("  Price", product.price);
            t.cell("  Quantity", product.stock_quantity);
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

        managerConsole();
    });
}