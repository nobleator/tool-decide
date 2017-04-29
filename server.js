// server.js
//==============================================================================
//

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);

// Convert and move to public (or client) directory
app.use(express.static(path.join(__dirname + '/')));

app.set('port', (process.env.PORT || 7777));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'));
});
