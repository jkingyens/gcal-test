var http = require('http');

// listen for requests from google google calendar
var server = http.createServer(function (req, res) {

  // verify this is actually google by testing the token
  // if this is a modification or deletion of an existing event, check if we know about it
  // (query database for the eventid)
  // if it hits our database, then update our information
  // otherwise, assume this is for an event we dont care about anymore

  // filter balanced hooks here as well

  /* SAMPLE POST REQUEST

     'x-goog-channel-id': '0d8d1a8e-720d-4a20-959b-dcd4e8a06cd9',
     'x-goog-channel-expiration': 'Tue, 15 Apr 2014 21:09:25 GMT',
     'x-goog-resource-state': 'exists',
     'x-goog-message-number': '157060',
     'x-goog-resource-id': 'sT0YtVEKk7n6S_SM-fFmClbsgcQ',
     'x-goog-resource-uri': 'https://www.googleapis.com/calendar/v3/calendars/jeff.kingyens@gmail.com/events?alt=json',
     'x-goog-channel-token': '6cba8ad1-e4ac-4f01-9c27-647659f168e2',

  */

  // filter out requests that dont come from google
  if (req.headers['user-agent'] !== 'APIs-Google; (+https://developers.google.com/APIs-Google.html)') {
    res.writeHead(404);
    res.end();
  }

  var channelId = req.headers['x-goog-channel-id'];
  var channelExpires = new Date(req.headers['x-goog-channel-expiration']);
  var resourceState = req.headers['x-goog-resource-state'];
  var messageNumber = req.headers['x-goog-message-number'];
  var resourceId = req.headers['x-goog-resource-id'];
  var resourceURI = req.headers['x-goog-resource-uri'];
  var channelToken = req.headers['x-goog-channel-token'];

  // emit the request
  console.log('message_number: ' + messageNumber);
  console.log('channel_id: ' + channelId);
  console.log('channel_expires: ' + channelExpires);
  console.log('channel_token: ' + channelToken);
  console.log('resoruce_state: ' + resourceState);
  console.log('resource_id: ' + resourceId);
  console.log('resource_uri: ' + resourceURI);

  // write successful response
  res.writeHead(200);

  // complete the response
  res.end();

});

// start on 8080
server.listen(8080);
