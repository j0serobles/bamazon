# bamazon
UCF Bootcamp Week 10 Homework.
Node.js &amp; MySQL

# ConstructorWordGuess
 * [Overview](#overview)

 * [How To Run](#howToRun)
 
 * [File Structure](#FileStructure)
 
 * [Demo movie](#Demo)
 
 * [Technologies Used](#techsUsed)
 
 * [How To Install](#howToInstall)
 
 * [Support](#support)
 
 
### Overview <a name="overview"></a>
bamazon is a command line interface application to showcase managing data in a MySQL database via javascript/Node.js.
"Bamazon" is really three separate application that run from different files:

* bamazonCustomer   : Allows the user to place an order for any of the items in the database. 
* bamazonManager    : Allows the user to manage inventory.
* bamazonSupervisor : Allows the user to view data by department and manage departments. 

### How To Run <a name="howToRun"></a>
To run any of the three applications for Bamazon, just run the file from node from your command line , like so:
```
$ node bamazonCustomer.js
$ node bamazonManager.js
$ node bamazonSupervisor.js
```
**bamazonManager.js**

  When the program starts, it shows a set of menu options:

  - View Products for Sale

  - View Low Inventory

  - Add to Inventory

  - Add New Product

  If a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities.

  If a manager selects View Low Inventory, then it lists all items with an inventory count lower than five.

  If a manager selects Add to Inventory, the app displays a prompt that will let the manager "add more" of any item currently in the store.

  If a manager selects Add New Product, it allows the manager to add a completely new product to the store.

**bamazonCustomer.js**

Running this application will first display all of the items available for sale, showing the ids, names, and prices of products for sale.  The app then prompts users with two messages.

The first asks them the ID of the product they would like to buy.
The second message asks how many units of the product they would like to buy.
Once the customer has placed the order, it checks if the store has enough of the product to meet the customer's request.  If not, the app logs a phrase like ```Insufficient quantity!```, and then prevent the order from going through.
If the store does have enough of the product, it will fulfill the order: this means updating the SQL database to reflect the remaining quantity.  Once the update goes through, the app shows the customer the total cost of their purchase.

**bamazonSupervisor.js**
 Running this application will list a set of menu options:

View Product Sales by Department

Create New Department

When a supervisor selects View Product Sales by Department, the app displays a summarized table in their terminal/bash window.


### File Structure <a name="FileStructure"></a>

itignore	Initial commit. Completed MVP for program.	21 hours ago
README.md	Initial commit	yesterday
bamazonCustomer.js	Initial commit. Completed MVP for program.	21 hours ago
bamazonManager.js	Completed bamazonManager.js	6 hours ago
package-lock.json	Initial commit. Completed MVP for program.	21 hours ago
package.json	Initial commit. Completed MVP for program.	21 hours ago
schema.sql
```
+-+.gitignore -- Files to be ignored by git (node packages and such).
  |
  + README.md -- (This file)
  |
  + bamazonCustomer.js -- Application file for the Customer functionalityt of bamazon.
  |
  + bamazonManager.js -- Application file for the Manager functionality of bamazon.
  |
  + bamazonSupervisor.js  -- Application file for the Supervisor functionality of bamazon.
  |
  + package-lock.json	-- Created by npm -init
  |
  + package.json  -- Created by npm -init
  |
  + schema.sql + -- Creates the database and the tables needed by the application.
```

### Demo <a name="Demo"></a>

A movie showing the application being used is available at:
* <a href="https://engjoserobles-gmail.tinytake.com/tt/MzczNTM2N18xMTM2ODk3OQ" target="_blank">Bamazon Demo</a>


**NOTE**: 

- For better viewing, set the movie player to "Full Size". 

- Following the movie link will replace your current page and take you to the video player's website. 

### Technologies Used <a name="techsUsed"></a>

bamazon is built using javascript and runs in the node.js engine.  It has various dependencies:

* npm package 'mysql' for connecting to and interacting with the mySQL database. 
* npm package 'inquirer' for prompting and processing the user's input. 

### How To Install <a name="howToInstall"></a>

To install the application on your local machine:
1. Install a local [mySQL](https://www.mysql.com/downloads/) database and start the mysqld process. Using the mySQL workbench or mysql cli, run the schema.sql file to create the database and tables. 
2. Clone the GitHub Repository for [bamazon](https://github.com/j0serobles/bamazon) on your local machine.
3. Run ```npm install``` to install all dependencies (node packages needed by by the application)
  
  ``` 
  npm install 
  (install messages displayed)
  ```
  
4. Test your installation, for example:
  ```
  node bamazonCustomer.js
  ```
  
  ### Support <a name="support"></a>
  If you have any issues installing or using the app, send me a notification at [engjoserobles@gmail.com](mailto:engjoserobles@gmail.com)
  
