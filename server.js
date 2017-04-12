

//==============================================================================

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);

app.set('port', (process.env.PORT || 7777));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(path.join(__dirname + '/public')));

http.listen(app.get('port'), function(){
    console.log('listening on port ' + app.get('port'));
});
