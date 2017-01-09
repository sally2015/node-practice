var fs = require('fs');
var fileDir = './count/';
var tasks = 0;
var wordsCounts = {};
var completeCounts = 0;

function countWordsInText(data) {
	data = data.toString()
		   .toLowerCase()
		   .split(/\W+/)
		   .sort();
	for (var index in data) {
		var word = data[index];
		if (word) {
			wordsCounts[word] = wordsCounts[word] ? wordsCounts[word] + 1 : 1;
		};
	}
}
function isComplete() {
	completeCounts++;
	if (completeCounts == tasks) {
		for(var index in wordsCounts){
			console.log(index + ":" + wordsCounts[index]);
		}
	};
}
fs.readdir(fileDir, function(err, files){
	if (err) { throw err; };
	tasks = files.length;
	for (var index in files ) {
			fs.readFile(fileDir + files[index], function(err, data) {
				if (err) { throw err; };
				countWordsInText(data);
				isComplete();
			});
		
	}
});