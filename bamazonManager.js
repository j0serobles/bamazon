var mysql    = require("mysql");
var inquirer = require('inquirer');
const table  = require('table') ; 

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "0f2t9F24",
  database: "bamazon"
});

// Establish database connection.
connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId + "\n");
  promptUser();
});

//////////////////////////////////////////////////////////////////////////////
function listProducts() {
  var query = connection.query(
  "SELECT id, product_name, length(product_name) \"name_length\", price, stock_qty FROM PRODUCTS ORDER BY ID",
  function( err, res ) {
    if ( err ) throw err;

    var data     = [];
    var record   = ["Line", "Product Name", "Price", "Amt In Stock"];
    data.push(record); 

    tblConfig = {
      columns: {
        2: {
          alignment: 'right',
        },
        3: {
          alignment: 'right',
        }
      }
    };

      res.forEach ( function( row, index ) {
        var record =  [];
        record.push( index + 1 ); 
        record.push( row.product_name ); 
        record.push( row.price.toFixed(2) );
        record.push( row.stock_qty.toFixed(2)); 
        data.push(record);
    }); //End of res.forEach
    
    output = table.table( data , tblConfig);
    console.log( output ); 

    promptUser();
  });
}

//////////////////////////////////////////////////////////////////////////////////////////
function viewLowStock() {

    var query = connection.query(
    "SELECT id, product_name, length(product_name) \"name_length\", price, stock_qty " +
    "FROM PRODUCTS WHERE STOCK_QTY < 5 ORDER BY ID",
    function( err, res ) {
      if ( err ) throw err;

      if ( res.length  > 0) {
      
      console.log (" Products with Low Inventory\n"); 
      var data     = [];
      var record   = ["Line", "Product Name", "Price", "Amt In Stock"];
      data.push(record); 
       
      tblConfig = {
        columns: {
          2: {
            alignment: 'right'
          },
          3: {
            alignment: 'right'
          }
        }
      };

      res.forEach ( function( row, index ) {
        var record =  [];
        record.push( index + 1 ); 
        record.push( row.product_name ); 
        record.push( row.price.toFixed(2) );
        record.push( row.stock_qty.toFixed(2)); 
        data.push(record);
      }); //End of res.forEach

      output = table.table( data , tblConfig);
      console.log( output ); 
      promptUser();
    }
    else {
      console.log ("\nThere are no products with low inventory.\n"); 
      promptUser();
    }

    });
  }

/////////////////////////////////////////////////////////////////////////////////////
function increaseStock(){

  // query the database for all items
  connection.query("SELECT * FROM PRODUCTS ORDER BY PRODUCT_NAME", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to add more stock
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "To What item would you like to add inventory?"
        },
        {
          name: "increase",
          type: "input",
          message: "How many units would you like to add?"
        }
      ]).then ( answers => {
         console.log (`Adding ${answers.increase} units to item ${answers.choice}.`);
         connection.query("UPDATE PRODUCTS SET STOCK_QTY = STOCK_QTY + " +
                           answers.increase + " WHERE PRODUCT_NAME = "   + 
                           "'" + answers.choice + "'", 
         function(err, results) {
            if (err) throw err;
            console.log (`${answers.increase} units added.`);
            promptUser();
         });

      });
    });
}

///////////////////////////////////////////////////////////////////////////////

function addProduct()   {
     // prompt for info about the item being put up for auction
  inquirer
  .prompt([
    {
      name: "item",
      type: "input",
      message: "Enter the Product Name"
    },
    {
        name: "department",
        type: "input",
        message: "Enter the Department the product belongs to."
      },
    {
      name: "itemPrice",
      type: "input",
      message: "What is the product's price?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
        name: "stockQty",
        type: "input",
        message: "How many units to add?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
  ])
  .then(function(answer) {
    // when finished prompting, insert a new row into bamazon.products.

    queryString = `insert into products ` + 
    ` (product_name, department_name, price, stock_qty, product_sales, department_id) ` +
    ` select '${answer.item}', '${answer.department}', ${answer.itemPrice}, ${answer.stockQty}, 0, d.department_id `             +
    ` from departments d where d.department_name = '${answer.department}'`;

    //console.log (queryString); 
    
    connection.query(queryString, 
      function(err) {
        if (err) throw err;
        console.log("Product created successfully!");
        // re-prompt the user 
        promptUser();
      }
    );
  });
};

'use strict';

function promptUser() {

  console.log ("Welcome to Bamazon"); 

inquirer
  .prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'What do you want to do?',
      choices: [
        'LIST Products for Sale',
        'VIEW Low Inventory',
        'ADD to Inventory',
        'NEW Product Addition',
        new inquirer.Separator(),
        'Disconnect from the Database Exit \n'
      ]
    }
  ])
  .then(answers => {
      if (answers.operation.search('LIST') > -1) {
          listProducts();
      }
      else if (answers.operation.search('VIEW') > -1) {
        process.stdout.write('\033c');
          viewLowStock(); 
      }
      else if (answers.operation.search('ADD') > -1) {

          increaseStock();
      }
      else if (answers.operation.search('NEW') > -1) {
        console.log('Add new Product'); 
        addProduct();
    }
    else if (answers.operation.search('Disconnect') > -1) {
        console.log ('Exit app.  Goodbye!'); 
        connection.end();
        return 0;
    }
  });
}