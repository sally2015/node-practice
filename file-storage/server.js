var http = require('http');
var path = require('path');
var qs = require('querystring');
var storage = require('./storage/web-storage');
var file = path.join(__dirname, './task.json');
console.log(storage)
function add(req, res) {
	var body = '';
	req.setEncoding('utf-8');
	req.on('data', function(chunk){
		body += chunk;
	});
	req.on('end', function(){
		var content = qs.parse(body).content;
		storage.addTask(file, content, function(){
			show(res);
		});
			
	})
	
}

function show(res){
	var html = '';
		storage.listTasks(file, function(task){
			html += '<li>'+ task +'</li>';
		}, function(){
			html += `<form method='post' action='/'>
					<p><input type="text" name='content' /></p>
					<p><input type="submit" value='Add' /></p>
				</form>`
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Content-Length', Buffer.byteLength(html));
			res.end(html);
		});
}

var server = http.createServer(function(req, res){
	if (req.url === '/') {
		if (req.method === 'GET') {
			
			show(res);
			
		} else if( req.method === 'POST' ) {
			add(req, res)
		}
	};
});

server.listen(3000);