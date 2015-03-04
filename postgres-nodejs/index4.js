/**
 * Created by ryanwhitley on 3/3/15.
 */

var pg = require("pg");
var http = require('http');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Welcome to the Amazon API!')
})

app.get('/products', function(req, res){

  //connect to postgres, execute a query and bring the results back here.
  var query = "SELECT * from product;";

  executePgQuery(query, function(err, result){

    //When done, come here
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(result.rows));

  })

})


app.get('/products/:id', function(req, res){

  //Grab the ID out of the URL
  var id = req.params.id;

  //connect to postgres, execute a query and bring the results back here.
  var query = "SELECT * from product ";

  query += " WHERE id=" + id;

  executePgQuery(query, function(err, result){

    //When done, come here
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(result.rows));

  })

})



var server = app.listen(1337, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})









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