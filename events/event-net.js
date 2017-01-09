var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
var net = require('net');
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
	console.log(this.listeners('broadcast'));
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message) {
		if (id !== senderId) {
			this.clients[id].write(message);
		};
	}
	this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id) {
	this.removeListener('broadcast', this.subscriptions[id]);
	this.emit('broadcast', id, id + 'has left');
});


var server = net.createServer(function(client) {
	var id = client.remoteAddress + ':' + client.remotePort;
	channel.emit('join', id, client);
	client.on('data', function(message) {
		message = message.toString();
		channel.emit('broadcast', id, message);
	});
	client.on('close', function() {
		channel.emit('leave', id);
	})
});



server.listen(8888);


