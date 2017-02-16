

//==============================================================================

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nextUserId = 0;
var users = [];

app.set('port', (process.env.PORT || 7777));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
  var socketId = socket.id;
  users.push({ 'id': socketId, 'name': "User" + nextUserId });
  nextUserId++;

  console.log(users[users.length - 1].name + ' joined with id ' + users[users.length - 1].id);
  io.emit('user connected', users[users.length - 1].name);
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('chat message', function (msg) {
    var name;
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == socket.id) {
        name = users[i].name;
      }
    }

    io.emit('chat message', name + ": " + msg);
    console.log('message: ' + name + ": " + msg);
  });
});

http.listen(app.get('port'), function(){
    console.log('listening on port ' + app.get('port'));
});
