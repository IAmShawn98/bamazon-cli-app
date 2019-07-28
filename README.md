# bamazon-cli-app

## Introduction
Bamazon CLI (command line interface) is an Amazon-like storefront created using Node js and MYSQL.<br>
<br>
There are three main functions of Bamazon that make up the entire application:
1. The Customer View:
   * Purchase Items, Deplete the Stock Quantity of Store Items From the Database.
2. The Manager View:
   * Filter Products Based On Their Stock Values.
   * Add New Products.
   * Add / Replenish Inventory stock quantity.
3. The Supervisor View:
   * View Product Over Head Costs
   * Read Product Sales.
   * Read Product Profits Based On Sales.
   * Create New Departments.

### How to Install Bamazon
Assuming you have <a href="https://nodejs.org/en/">Node JS</a> and <a href="https://www.mysql.com/products/workbench/">MYSQL Workbench</a> installed:

1. Clone or download this project however you desire by clicking on the green 'Clone or Download' button.
2. Go into the 'bamazon-cli-app' folder and inside there, go to: 'assets ---> database'.
3. Once there, copy the contents of the 'schema.sql' and 'seeds.sql' and run them through MYSQL workbench.
4. Finally, navigate to 'assets ---> js' and run 'Bamazon Launcher.bat'.

That's it, once you've done that, you should be able to go into any of the three options and perform any desired function.
If you run any of the three options and don't see any table data, be sure to execute the dummy data INSERTS that the
'seeds.sql' file provides! (Or go into the Bamazon Manager View (Option 2 in the launcher) and add new products).

## Video Demonstration
Demonstration Here: https://www.youtube.com/watch?v=gGFVIu9c62k&feature=youtu.be
