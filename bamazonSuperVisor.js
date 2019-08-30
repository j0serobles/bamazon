var   mysql    = require("mysql");
var   inquirer = require('inquirer');
const table    = require('table'); 

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


function viewSalesByDept() {
  var query = connection.query(
    `select d.department_id, d.department_name, d.overhead_costs, `               +
    ` sum(p.product_sales) "product_sales",  (sum(p.product_sales) - d.overhead_costs) "total_profit"` +
     ` from departments d, products p`                                            +
     ` where d.department_id = p.department_id`                                   +
     ` group by d.department_id, d.department_name, d.overhead_costs`             +
     ` order by 1`,
  function( err, res ) {
    if ( err ) throw err;
      
      var data     = [];
      var record   = ["Dept ID", "Dept Name", "Overhead Costs" , "Product Sales", "Total Profit"];
      data.push(record); 
      tblConfig = {
        columns: {
          2: {
            alignment: 'right',
          },
          3: {
            alignment: 'right',
          },
          4: {
            alignment: 'right',
          }
        }
      };

      var output;
      
      res.forEach ( function( row, index ) {
        var record =  [];
        record.push( row.department_id ); 
        record.push( row.department_name ); 
        record.push( row.overhead_costs.toFixed(2) );
        record.push( row.product_sales.toFixed(2) ); 
        record.push( row.total_profit.toFixed(2) );
        data.push(record);
    }); //End of res.forEach
    
    output = table.table( data , tblConfig);
    console.log( output );  
    promptUser();
  });
}

////////////////////////////////////////////////////////////////////////////////////////

function addDepartment()   {
  // prompt for info about the department
  inquirer
  .prompt([
    {
      name: "deptName",
      type: "input",
      message: "Enter the Department Name"
    },
    {
        name: "overheadCosts",
        type: "input",
        message: "Enter the Department's overhead costs."
    }
  ])
  .then(function(answer) {
    // when finished prompting, insert a new row into bamazon.departments
    connection.query(
      "INSERT INTO DEPARTMENTS SET ?",
      {
        department_name : answer.deptName,
        overhead_costs  : answer.overheadCosts||0
      },
      function(err) {
        if (err) throw err;
        console.log("Department created successfully!");
        // re-prompt the user
        promptUser();
      }
    );
  });
};

/////////////////////////////////////////////////////////////////////////
'use strict';

console.log ("Welcome To Bamazon"); 
function promptUser() {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'What do you want to do?',
      choices: [
        'VIEW Product Sales By Department',
        'CREATE New Department',
        new inquirer.Separator(),
        'Disconnect from the Database and get out of here.'
      ]
    }
  ])
  .then(answers => {
      if (answers.operation.search('VIEW') > -1) {
          
          viewSalesByDept();
      }
      else if (answers.operation.search('CREATE') > -1) {
          addDepartment(); 
      }
      else if (answers.operation.search('Disconnect') > -1) {
        console.log ('Exit app.  Goodbye!'); 
        connection.end();
        return 0;
    }
  });
}