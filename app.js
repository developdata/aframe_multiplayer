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



io.on('connection', function(socket){
    console.log('socket.io connection');

    socket.on('updateRotation', function(data){
    	io.emit('updateCube', data);
    })




socket.on('disconnect', function(){
        console.log('disconnected');
       
    });
});
server.listen(3000, function(){
    console.log('listening on port 3000...');
});

