var http = require('http');

// listen for requests from google google calendar
var server = http.createServer(function (req, res) {

  // verify this is actually google by testing the token
  // if this is a modification or deletion of an existing event, check if we know about it
  // (query database for the eventid)
  // if it hits our database, then update our information
  // otherwise, assume this is for an event we dont care about anymore

  // emit the request
  console.log(req);

  // write successful response
  res.writeHead(200);

  // complete the response
  res.end();

});

// start on 8080
server.listen(8080);
