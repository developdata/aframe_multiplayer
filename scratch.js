var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.render('index');
});

var player1 = [];
var player2 = [];
var playerRed = [];
var playerBlue = [];

io.on('connection', function(socket){
    console.log('socket.io connection');

    socket.on('test', function(data){
    	socket.emit('test2', data);
    })

    var browserid = socket.id;
    var setupData = assignRole(browserid);
    
    socket.emit('setup', setupData);

    socket.on('blue', function(data){
    	console.log(data);
    });

    socket.on('updateRotation', () => {
    	console.log('in update updateRotation')
			socket.emit('test', { hello: 'world' } );
		});

    socket.emit('updateCube', { hello: 'world' } );

    // socket.on('updateRotation', function(data){
    // 	// console.log(data);
    // 	socket.emit('updateCube', 'one tow');
    	
    // })



    socket.on('disconnect', function(){
        console.log('disconnected');
        var arrayIndex;
    
    if(player1.includes(socket.id)){
       arrayIndex = player1.indexOf(socket.id);
        if (arrayIndex !== -1) {
          player1.splice(arrayIndex, 1);
        }
    } else if(player2.includes(socket.id)){
       arrayIndex = player2.indexOf(socket.id);
        if (arrayIndex !== -1) {
          player2.splice(arrayIndex, 1);
        }
    } else if(playerRed.includes(socket.id)){
       arrayIndex = playerRed.indexOf(socket.id);
        if (arrayIndex !== -1) {
          playerRed.splice(arrayIndex, 1);
        }
    } else if(playerGreen.includes(socket.id)){
       arrayIndex = playerGreen.indexOf(socket.id);
        if (arrayIndex !== -1) {
          playerGreen.splice(arrayIndex, 1);
        }
    }
    });
});
server.listen(3000, function(){
    console.log('listening on port 3000...');
});

function assignRole(browserid){
	
	if(player1.length === 0){
    player1.push(browserid);
    return ["player1", "red", "blue"];
  } else if (player2.length === 0){
    player2.push(browserid);
    return ["player 2", "blue", "red"];
  } else if(playerRed.length > playerBlue.length){
    playerBlue.push(browserid);
    return ["Blue Player", "red", "blue"];
  } else {
    playerRed.push(browserid);
    return ["Red Player", "red", "blue"];
  }
}