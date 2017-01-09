var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();

channel.on('join', function(){
	console.log('server');
});

setTimeout(function(){
	channel.emit('join');
},3000);