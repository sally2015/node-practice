var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join('');
var file = path.join(process.cwd(), '../task.json');
/*
* 直接运行 node command-storage list
* 直接运行 node command-storage add 内容
*/
switch(command) {
	case 'list':
		listTasks(file);
		break;
	case 'add':
		addTask(file, taskDescription);
		break;
	default:
		console.log('Usage:' + process.argv[0] + ' list | add [taskDescription]');
		break;
};

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
				cb(tasks);
			});
		} else {
			cb([]);
		}
	});
}

function listTasks(file) {
	loadTask(file, function(tasks) {
		for(var i in tasks) {
			console.log(tasks[i]);
		}
	});
}

function storeTask(file, tasks) {
	fs.writeFile(file, JSON.stringify(tasks), 'utf-8', function(err){
		if (err) { throw err };
		console.log('saved');
	})
}

function addTask(file, taskDescription) {
	loadTask(file, function(tasks){
		tasks.push(taskDescription);
		storeTask(file, tasks);
	});
}
