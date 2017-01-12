var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join('');
var file = path.join(process.cwd(), '../task.json');

function loadTask(file, cb) {
	fs.exists(file, function(exists){
		var tasks = [];
		if (exists) {
			fs.readFile(file, 'utf-8', function(err, data) {
				if (err) {
					throw err;
				};
				var data = data.toString();
				tasks = JSON.parse(data);
				cb && cb(tasks);
			});
		} else {
			cb([]);
		}
	});
}

function listTasks(file, cb, success) {
	loadTask(file, function(tasks) {
		for(var i in tasks) {
			cb(tasks[i]);
		}

		success && success();
	});
}

function storeTask(file, tasks, success) {
	fs.writeFile(file, JSON.stringify(tasks), 'utf-8', function(err){
		if (err) { throw err };
		success && success();
	})
}

function addTask(file, taskDescription, success) {
	loadTask(file, function(tasks){
		tasks.push(taskDescription);
		return storeTask(file, tasks, success);
	});
}


module.exports = {
	addTask: addTask,
	storeTask: storeTask,
	listTasks: listTasks
}