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

'use strict';


// Establish database connection.
// And call main function to prompt user.
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  promptUser();
});


///////////////////////////////////////////////////////////////////////////////
function buyItem( itemID, quantity ) {

//Confirm with the user that they want to proceed with the order. 

  var confirm = [
    {
      type:'confirm', 
      name: 'placeOrder',
      message: 'Confirm Order?',
      default: true
    }
  ];

inquirer.prompt ( confirm )
  .then (

      function ( answers ) {

      if( answers.placeOrder ) {

        // Customer wishes to proceed with the order.
        // Check if there is enough inventory to supply order. 
        var query = connection.query(
          "SELECT price, product_name, stock_qty FROM PRODUCTS WHERE ?",
          {
            id   : itemID

          },
          function(err, res) {

            if (err) throw err;
            
            console.log(res[0].stock_qty + " items available.\n");
            if ( (res[0].stock_qty - quantity) >= 0) {
              //There is enough to fulfill order, update the quantity in stock. 
              console.log ("Fullfilling order...please wait.\n");
              query = connection.query(`UPDATE PRODUCTS `                         +
                                       ` SET stock_qty = stock_qty - ${quantity}` +
                                       ` WHERE id = ${itemID}`,
                                         function (err, updateResult) {
                                           if (err) throw err;
                                           //Show order total to the customer.
                                           console.log ("\n----------------------"); 
                                           console.log ("Your Order is confirmed."); 
                                           console.log (`${quantity} ${res[0].product_name}`);
                                           var order_total = quantity * res[0].price;
                                           console.log (`Order Total = $ ${order_total.toFixed(2)}`); 
                                           console.log ("----------------------\n"); 
                                           promptUser();
                                         }
                                       );
            }
            else {
              //There are not enough items in stock to satisfy order. 
              // Print message and prompt user again.
              console.log ("Insufficient Quantity!. Cannot complete order.\n\n"); 
              promptUser();
            }
          });
        }
        else {
          //User does not want to place order, go to main prompt again
          promptUser();
        }
    });
}




function promptUser() {

//First, display all the items in the table
var query = connection.query("SELECT id, product_name , price FROM PRODUCTS ORDER BY ID",'',
  function( err, res ) {
    if ( err ) throw err;
    console.log ('----------------------------------------\n');
    res.forEach ( function( row, index ) {
      console.log (`${index + 1}) ${row.product_name}, $${row.price.toFixed(2)}`)
    }); //End of res.forEach
    console.log ('\n----------------------------------------\n');

    //Then prompt the user
   inquirer.prompt([
   {
      type: 'input',
      name: 'item_id',
      message: "Enter the line number of the item to buy ( 0 to exit program):",
      validate: function(value) {
        if (isNaN( value )) {
          return 'Please enter a valid number.'; 
        } 
        else {
          return (true) ;
        }
      }
   }
  ])
  .then(answer1 => {
    
    //If any input value is 0, exit the program. 

    if ( parseInt( answer1.item_id ) === 0) { 
      connection.end();
      console.log('Exit app. Goodbye!'); 
    }
    else {
      
      //Input is not 0, that means the user wants to place an order.
      inquirer.prompt (
        [{
          type: 'input',
          name: 'quantity',
          message: "Enter the quantity to buy (0 to exit program):",
          validate: function(value) {
            if (isNaN( value )) {
              return 'Please enter a valid number.'; 
            } 
            else {
              return (true) ;
            }
          }
        }]).then ( answer2 => {

        if ( parseInt( answer2.quantity ) === 0) { 
          connection.end();
          console.log('Exit app. Goodbye!'); 
        }
        else {
          // Call function to fullfill order if there is stock available. 
          buyItem( answer1.item_id, answer2.quantity  );
        }
      }); //End of inner .then(...
    } // End of else
    }); // End of outer .then(... 
  });  //End of connection.query
} // End of promptUser function