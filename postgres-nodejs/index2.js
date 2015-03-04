/**
 * Created by ryanwhitley on 3/3/15.
 */

var pg = require("pg");
var http = require('http');


http.createServer(function (req, res) {

  //connect to postgres, execute a query and bring the results back here.
  var query = "SELECT * from product;";

  executePgQuery(query, function(err, result){

    //When done, come here
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(result.rows));

  })




}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');










//Declare the credentials to connect to postgres
var connectionString = "postgres://postgres:''@localhost:5432/warehouse";


function executePgQuery (query, callback) {
  //Just run the query
  //Setup Connection to PG
  pg.connect(connectionString, function(err, client, done) {
    if(err){
      //return an error
      callback(err);
      return;
    }

    //Log the query to the console, for debugging
    console.log("Executing query: " + query);

    //execute query
    client.query(query, function(err, result) {
      done();

      //go to callback
      callback(err, result);
    });
  });
};