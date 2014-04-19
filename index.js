var http = require('http');
var concat = require('concat-stream');

// listen for requests from google google calendar
var server = http.createServer(function (req, res) {

  // filter out requests that dont come from google
  if (req.headers['user-agent'] === 'APIs-Google; (+https://developers.google.com/APIs-Google.html)') {

    /* SAMPLE POST REQUEST

       'x-goog-channel-id': '0d8d1a8e-720d-4a20-959b-dcd4e8a06cd9',
       'x-goog-channel-expiration': 'Tue, 15 Apr 2014 21:09:25 GMT',
       'x-goog-resource-state': 'exists',
       'x-goog-message-number': '157060',
       'x-goog-resource-id': 'sT0YtVEKk7n6S_SM-fFmClbsgcQ',
       'x-goog-resource-uri': 'https://www.googleapis.com/calendar/v3/calendars/jeff.kingyens@gmail.com/events?alt=json',
       'x-goog-channel-token': '6cba8ad1-e4ac-4f01-9c27-647659f168e2',

    */

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

    // lookup the user associated with this watch
    // perform a calendar sync from last known timestamp
    // apply updates with test for old timestamp
    // apply reach API business logic
    // if user-facing state changed, publish notification on redis channel
    // if socket-based user session is active, emit event on the socket
    // otherwise, sent a push notification to wake up app and figure out what to do

  } else {

    if (req.headers['user-agent'] === 'balanced/hooker/1.0') {

      /*
       'user-agent': 'balanced/hooker/1.0',
       'x-newrelic-id': 'Vg8CVVdWGwIJUFVXAwI=',
       'x-newrelic-transaction': 'PxRSBwdaC1YCBgABVAJTVFYJFB9CAAIOQwdl',
       'x-forwarded-for': '::ffff:50.18.199.26',
       'x-real-ip': '::ffff:50.18.199.26',
       'x-forwarded-protocol': 'http',
       'x-forwarded-proto': 'http',
       'x-forwarded-port': '80',
       connection: 'close' },
      */

      var data_stream = concat(function (data) {
        try {
          var parsed_data = JSON.parse(data);
          console.log(parsed_data);
        } catch (err) {
          res.writeHead(500);
          res.end();
        }
        res.writeHead(200);
        res.end();
      });

      req.pipe(data_stream);

    } else {

      console.log('UNKNOWN');
      console.log(res);
      res.writeHead(404);
      res.end();

    }

  }

});

// start on 8080
server.listen(8080);
