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

  If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

  If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

  If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in   the store.

  If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

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

When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

### File Structure <a name="FileStructure"></a>

```
+-+.gitignore -- Files to be ignored by git (node packages and such).
  |
  + README.md -- (This file)
  |
  + letter.js -- Module for the Letter object. 
  |
  + word.js -- Module for the Word object 
  |
  + index.js  -- Contains the program's logic
  |
  + package-lock.json	-- Created by npm -init
  |
  + package.json  -- Created by npm -init
  |
  + assets + -- Application assets, currently empty
  |
  + design + -- Design Documentation
           |
           + Game_Play_Diagram.drawio -- Flowchart for the Game Play function.
           |
           + Main_Logic_Flowchart_Diagram.drawio -- Flowchar for the main application logic. 
```

### Demo <a name="Demo"></a>

A movie showing a sample session for ConstructorWordGuess can be accessed <a href="https://engjoserobles-gmail.tinytake.com/tt/MzcyNjQwNV8xMTM0MDg1NQ" target="_blank">here</a>

**NOTE**: For better viewing, set the movie player to "Full Size". 

Following the movie link will replace your current page and take you to the video player's website. 

### Technologies Used <a name="techsUsed"></a>

ConstructoWordGuess is built using javascript and runs in the node.js engine.  It has various dependencies:

* npm package 'axiom' for http GET calls to the API's.
* npm package 'inquirer' for prompting and processing the user's input. 

### How To Install <a name="howToInstall"></a>

To install the application on your local machine:
1. Clone the GitHub Repository for [ConstructorWordGuess](https://github.com/j0serobles/ConstructorWordGuess) on your local machine.
2. Run ```npm install``` to install all dependencies (node packages needed by by the application)
  
  ``` 
  npm install 
  (install messages displayed)
  ```
  
  4. Test your installation, for example:
  ```
  node index.js
  ```
  
  ### Support <a name="support"></a>
  If you have any issues installing or using the app, send me a notification at [engjoserobles@gmail.com](mailto:engjoserobles@gmail.com)
  
