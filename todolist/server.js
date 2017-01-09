var http = require('http');
var qs = require('querystring');
var items = [];

function show(res) {
	var arr = items.map(function(value){
		return `<li>${value.content}---${value.name}</li>`;
	});
	var html = `
		<ul>${arr.join('')}</ul>
		<form method='post' action='/'>
			<p><input type="text" name='name' /></p>
			<p><input type="text" name='content' /></p>
			<p><input type="submit" value='Add' /></p>
		</form>
	`;
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}
function add(req, res){
	var body = '';
	req.setEncoding('utf-8');
	req.on('data',function(chunk){
		body += chunk;
	});
	req.on('end', function(){
		var obj = qs.parse(body);
		items.push(obj);
		show(res);
	});
}
function badRequest(res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('badRequest');
}
function notFound(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('notFound');
}
var server = http.createServer(function(req, res){
	if (req.url == '/') {
		switch(req.method) {
			case 'GET':
				show(res);
				break;
			case 'POST':
				add(req, res);
				break;
			default:
				badRequest(res);
		}
	} else {
		notFound(res);
	}
});

server.listen(3000);
