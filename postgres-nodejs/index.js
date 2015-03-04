/**
 * Created by ryanwhitley on 3/3/15.
 */

var http = require('http');


http.createServer(function (req, res) {

    //When done, come here
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello Tech Diversified!");

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');





