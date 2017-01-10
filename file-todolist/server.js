var http = require('http');
var formidable = require('formidable');
var qs = require('querystring');
var path = require('path');
var items = [];
var fs = require('fs');
var root = __dirname;
function show(res) {
	var arr = items.map(function(value){
		return `<li>${value.name}---<img src=${value.filePath}/></li>`;
	});
	var html = `
		<ul>${arr.join('')}</ul>
		<form method='post' enctype="multipart/form-data" action='/'>
			<p><input type="text" name='name' /></p>
			<p><input type="file" name='file' /></p>
			<p><input type="submit" value='upload' /></p>
		</form>
	`;
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}


//确定是文件上传请求
function isFormData(req) {
	var type = req['Content-type'] || '';
	return 0 === type.indexOf(type); 
}
function upload(req, res) {
	if (!isFormData(req)) {
		res.statusCode = 400;
		res.end('bad request: expecting multipart/form-data');
		return;
	};

	var form = new formidable.IncomingForm();
	form.on('file', function(name, file){
		var readStream = fs.createReadStream(file.path);
		var writeStream = fs.createWriteStream('./image/' + file.name);
		readStream.pipe(writeStream);
		items.push({
			name: name,
			filePath:  path.join('./image/' + file.name)
		});
	});
	form.on('end', function(){
		show(res);
	});
	form.parse(req);
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
				upload(req, res);
				break;
			default:
				badRequest(res);
		}
	} else if ( req.url.indexOf('image/') !== -1) {
		
		var filePath = path.join(root, req.url);
		fs.readFile(filePath, "binary", function(error, file) {
	        if(error) {
	            res.writeHead(500, {"Content-Type": "text/plain"});
	            res.write(error + "\n");
	            res.end();
	        } else {
	            res.writeHead(200, {"Content-Type": "image/png"});
	            res.write(file, "binary");
	            res.end();
	        }
	    });
	}  else {
		notFound(res);
	}
});

server.listen(3000);
