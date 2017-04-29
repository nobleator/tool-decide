// server.js
//==============================================================================
//

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + '/public/views'));

// Read in Topic, create Topic object?

//==============================================================================
// Routes?
app.post('/topic', function(req, res) {
  var Topic = require('./controllers/topic');
  var topicItem = new Topic(req.body.topic);
  console.log('Topic is: ' + topicItem.name);
  res.sent({});
});

app.set('port', (process.env.PORT || 7777));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

http.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'));
});
