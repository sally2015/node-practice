var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFile = './rss.txt';

function checkRssFile() {
	fs.exists(configFile, function(exists) {
		if (!exists) {
			return next(new Error('miss rss file' + configFile));
		};
		next(null, configFile);
	})
}

function readRssFile(configFile) {
	fs.readFile(configFile, function(err, url) {
		if (err) {
			return next(err);
		};
		url = url.toString()
			 	 .replace(/^\s+|\s+$/g, '');
		var random = Math.ceil( Math.random() * 1000 );
		next(null, url);
	});
}

function downloadRss(url) {
	request({url: url}, function(err, res, body) {
		if (err) {
			return next(err)
		};
		if (res.statusCode != 200) {
			return next(new Error('abnormal response'))
		};
		next(null, body);
	})
}

function parseRss(body) {
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(body);
	if (!handler.dom.length) {
		return next(new Error('length is 0'))
	}; 
	handler.dom.forEach(function(item){
		console.log(item);
	})
}

var task = [checkRssFile, readRssFile, downloadRss, parseRss];

function next(err, data) {
	if (err) {
		console.log(err);

		return;
	};

	var cb = task.shift();
	cb && cb(data);
}

next();