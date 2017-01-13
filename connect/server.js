var connect = require('connect');
var router = require('./middleware.js');
var app = connect();

function setup(format) {
	var reg = /:(\w+)/g;
	return function(req, res, next) {
		var str = format.replace(reg, function(match, property){
			return req[property];
		});
		console.log(str);
		next();
	}
}
function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
}
var routes = {
	GET: {
		'/users': function(req, res, next) {
			res.setHeader('Content-type', 'application/json');
			res.end(JSON.stringify(['todo', 'kk']));
		},
		'/users/:id': function(req, res, id) {
			res.end('user' + id);
		}
	}
}
app.use(setup(':method :url '));
app.use(router(routes))
// app.use('/admin', restrict);
// app.use('/admin', admin);
// function restrict(req, res, next) {
// 	console.log(1111)
// 	next();
// }

// function admin(req, res, next) {
// 	switch (req.url) {
// 		case '/':
// 			res.end('try /users');
// 			break;
// 		case '/users':
// 			res.setHeader('Content-type', 'application/json');
// 			res.end(JSON.stringify(['todo', 'kk']));
// 			break;
// 	}
// }

app.listen(3000);