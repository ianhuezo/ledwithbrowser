

var express= require('express');//setup of all required modules
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var
var state = 1;
var wpi = require('wiring-pi');
var configPin = 7;

wpi.setup('wpi');//configure wiringpi
wpi.pinMode(configPin, wpi.OUTPUT);

users = [];
connections = [];


server.listen(process.env.Port || 1500, "0.0.0.0");
console.log('Server running...');

app.get('/',function(req,res){
	res.sendFile(__dirname+'/homepage.html')
})//directs the files to the page


io.sockets.on('connection',function(socket){//logic for how many people are connected to your page and the state of the LED
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length)

	socket.on('disconnect', function(data){
	connections.splice(connections.indexOf(socket), 1);
	console.log('DisconnectedL %s sockets connected', connections.length);
	});

	socket.on('1',function(){
		console.log("The state is %s", state);
		state = 0;
		wpi.digitalWrite(configPin,state);
	});

	socket.on('0',function(){
		console.log("The state is %s", state);
		state = 1;
		wpi.digitalWrite(configPin,state);
	});

});
