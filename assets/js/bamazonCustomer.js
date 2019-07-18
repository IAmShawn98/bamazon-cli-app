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

// Show the customer all products currently in stock.
function productTable() {
    // Each time the view is executed, clear the CLI to avoid duplicate views from past executions.
    console.clear();
    // Use our SQL products table.
    connection.query("SELECT * FROM products", function (err, res) {
        // Catch any errors.
        if (err) throw err;

        // Create our new table.
        var t = new Table

        // Bamazon Ascii Banner.
        console.log(`
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▀▀█ █▀▄▀█ █▀▀█ ▀▀█ █▀▀█ █▀▀▄   █▀▀ █░░ ░▀░ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ 
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ █▀▀▄ █▄▄█ █░▀░█ █▄▄█ ▄▀░ █░░█ █░░█   █░░ █░░ ▀█▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫
    ¸¸.•*¨*•♫♪¸¸.•*¨*•♫ ▀▀▀░ ▀░░▀ ▀░░░▀ ▀░░▀ ▀▀▀ ▀▀▀▀ ▀░░▀   ▀▀▀ ▀▀▀ ▀▀▀ ¸¸.•*¨*•♫♪¸¸.•*¨*•♫

    ------------------------- Your Friendly Internet Storefront! ---------------------------
`)
        // Build storefront from our SQL data.
        res.forEach(function (product) {
            t.cell("\n")
            t.cell('  Product ID', product.item_id)
            t.cell('  Product Name', product.product_name)
            t.cell('  Department Name', product.department_name)
            t.cell('  Price', product.price)
            t.cell('  Quantity', product.stock_quantity)

            // Execute Build.
            t.newRow()
        });

        // Populate CLI with our SQL datatable.
        console.log(" ╔═════════════════════════════════ CUSTOMER STOREFRONT VIEW ══════════════════════════════════════╗");
        console.log(t.toString());
        console.log(" ╚═════════════════════════════════════════════════════════════════════════════════════════════════╝\n");

        // Prompt the user to make purchases.
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "item_id",
                    message: "Enter the 'Product ID' of the item you'd like to purchase:"
                },
                {
                    type: "input",
                    name: "stock_quantity",
                    message: "How many units of this item would you like to purchase:"
                }
            ])
            .then(product => {
                // Target the item_id of the row the customer wants to buy from.
                connection.query("SELECT * FROM products WHERE item_id = " + product.item_id, function (err, res) {
                    // If there is an error, handle it.
                    if (err) throw err;
                    // Default Amount When No Data Is Populated.
                    var totalCost = 0;
                    // Calculate price based on total price * total units sold during transaction. 
                    totalCost = res[0].price * product.stock_quantity;

                    if (res[0].stock_quantity <= 0) {
                        console.log("Insufficient quantity!");
                    } else {
                        // When the customer is finished shopping, show their virtual receipt.
                        console.clear();
                        console.log(`
                                        
                    ********** **                         **     **    **                 
                    /////**/// /**                        /**    //**  **                  
                        /**    /**       ******   ******* /**  ** //****    ******  **   **
                        /**    /******  //////** //**///**/** **   //**    **////**/**  /**
                        /**    /**///**  *******  /**  /**/****     /**   /**   /**/**  /**
                        /**    /**  /** **////**  /**  /**/**/**    /**   /**   /**/**  /**
                        /**    /**  /**//******** ***  /**/**//**   /**   //****** //******
                        //     //   //  //////// ///   // //  //    //     //////   ////// 
                    -------------------------------------------------------------------------------
                                                - PURCHASE COMPLETE -\n
                                        Thank you for shopping with Bamazon!
                                              Please Take Your Receipt.

                                                Inventory Updated!
                                                  Total purchase:\n
                                                    `+ "$" + totalCost + `
                    -------------------------------------------------------------------------------
                            
                                                `);
                    }
                });
                // Deduct however many purchases the customer wants to make from the selected row.
                connection.query("UPDATE products SET stock_quantity = stock_quantity -" + product.stock_quantity + " WHERE item_id =" + product.item_id, function (err, res) {
                    if (err) throw err;
                });
                // Close connection.
                connection.end();
            });

    });
}