var connect = require('connect');

var api = connect()
		 .use(users)
		 .use(pets)
		 .use(errHandler);
var app = connect()
		 .use(hello)
		 .use('/api', api)
		 .use(errPage)
		 .listen(3000);

function hello(req, res, next) {
	if (req.url.match(/^\/hello/)) {
		res.end('hello world');
	} else {
		next();
	}
}
var db = {
	users: [
		{name: 'tobi'},
		{name: 'loki'},
		{name: 'jane'}
	]
}

function users(req, res, next) {
	var match = req.url.match(/^\/user\/(.+)/);
	console.log(match[1])
	if (match) {
		var user = db.users[match[1]];
	console.log(user)

		if (user) {
			 res.setHeader('Content-type', 'application/json');
			 res.end(JSON.stringify(user));
		} else {
			var err = new Error('user not found');
			err.notFound = true;
			next(err)
		}
	} else {
		next();
	}
}

function pets(req, res, next) {
	if (req.url.match(/^\/pet\/(.+)/)) {
		foo();
	} else {
		next();
	}
}
function errHandler(err, req, res, next) {
	res.setHeader('Content-type', 'application/json');
	if (err.notFound) {
		res.statusCode = 404;
		console.log(404)
		res.end(JSON.stringify({error: err.message}));
	} else {
		res.statusCode = 500;
		res.end(JSON.stringify({error: 'interval server error'}));
	}
}

function errPage(err, req, res, next) {
	res.setHeader('Content-type', 'application/json');
		res.statusCode = 500;
		res.end(JSON.stringify({error: 'interval server error'}));
}

//访问：http://localhost:3000/api/user/1
//错误测试: http://localhost:3000/api/xxx/1