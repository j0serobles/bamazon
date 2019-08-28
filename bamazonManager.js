var mysql = require("mysql");
var inquirer = require('inquirer');

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
  console.log("connected as id " + connection.threadId + "\n");
  promptUser();
});


function listProducts() {
  var query = connection.query(
  "SELECT id, product_name, length(product_name) \"name_length\", price, stock_qty FROM PRODUCTS ORDER BY ID",
  function( err, res ) {
    if ( err ) throw err;
    console.log ('\n+-------------------------------------------+'); 
    console.log ('|---------------- ALL PRODUCTS -------------|'); 
    console.log ('+-------------------------------------------+'  ); 
    console.log ('|Line | Product Name | Price |   In Stock   |');
    console.log ('+-------------------------------------------+'  ); 
      res.forEach ( function( row, index ) {
      console.log (`${index + 1}) | ${row.product_name} | $${row.price.toFixed(2)} | ${row.stock_qty}`);
    }); //End of res.forEach
    console.log ('\n------------------------------------------\n');

    promptUser();
  });
}


function viewLowStock() {
    var query = connection.query(
    "SELECT id, product_name, length(product_name) \"name_length\", price, stock_qty " +
    "FROM PRODUCTS WHERE STOCK_QTY < 5 ORDER BY ID",
    function( err, res ) {
        if ( err ) throw err;
        console.log ('\n+-----------------------------------------+'); 
        console.log ('|------ PRODUCTS WITH LOW INVENTORY ------|'  ); 
        console.log ('+-----------------------------------------+'  ); 
        console.log ('| Line | Product Name | Price |  In Stock |');
        console.log ('+-----------------------------------------+'  ); 
        res.forEach ( function( row, index ) {
        console.log (`${index + 1}) | ${row.product_name} | $${row.price.toFixed(2)} | ${row.stock_qty}`);
        }); //End of res.forEach
        if ( res.length === 0) {
            console.log ("\nThere are no products with low inventory."); 
        }
        console.log ('\n----------------------------------------\n');
    });
    promptUser();
};
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
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name    : answer.item,
        department_name : answer.department,
        price           : answer.itemPrice   || 0,
        stock_qty       : answer.stockQty    || 0
      },
      function(err) {
        if (err) throw err;
        console.log("Product created successfully!");
        // re-prompt the user for if they want to bid or post
        promptUser();
      }
    );
  });
};
///////////////////////////////////////////////////////////////////////////////
// function postProduct() {

//   var questions  = [
//     {
//       type: 'input',
//       name: 'item_name',
//       message: 'Please enter the product name:',
//     },
//     {
//         type: 'list',
//         name: 'category',
//         message: 'What is the product catgory?',
//         choices: ['Item', 'Tasks', 'Job', 'Project'],
//         filter: function(val) {
//           return val.toLowerCase();
//         },
//     },
//     {
//       type: 'input',
//       name: 'starting_bid',
//       message: 'Bid amount starts at:',
//       validate: function(val) {
//           validValue = (!isNaN(val)) && (val > 0);
//         return validValue || 'Value must be a number.';
//       }
//     }
//   ];

//   var confirm = [
//     {
//       type:'confirm', 
//       name: 'askAgain',
//       message: 'Post another item (Hit <Enter> for YES) ?',
//       default: true
//     }
//   ];

// inquirer.prompt (questions)
//   .then ( 
//     function (answers) {
//       var query = connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name   : answers.item_name,
//           category    : answers.category,
//           starting_bid: answers.starting_bid,
//           highest_bid : 0
//         },
//         function(err, res) {
//           if (err) throw err;
//           console.log(res.affectedRows + " item posted!\n");
//           //Ask for confirmation to add another.
//           inquirer.prompt ( confirm ).then ( function ( answer ) {
//             if  ( answer.askAgain ) {
//               postProduct(); 
//             }
//           else { 
//             promptUser();
//           }
//         });
//       });
//     });
// }

/////////////////////////////////////////////////////////////////////////////////
// function  bidOnProduct(){
//     console.log("Bid On Product"); 
//     promptUser();
// }

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }3333

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }

'use strict';

function promptUser() {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Welcome to Bamazon.  What do you want to do?',
      choices: [
        'LIST Products for Sale',
        'VIEW Low Inventory',
        'ADD to Inventory',
        'NEW Product Addition',
        new inquirer.Separator(),
        'Disconnect from the Database and get out of here.'
      ]
    }
  ])
  .then(answers => {
      if (answers.operation.search('LIST') > -1) {
          console.log ("List Products for Sale"); 
          listProducts();
      }
      else if (answers.operation.search('VIEW') > -1) {
          console.log("View Low Inventory"); 
          viewLowStock(); 
      }
      else if (answers.operation.search('ADD') > -1) {
          console.log('Increase Stock'); 
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