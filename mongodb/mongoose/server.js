var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;
var Tasks  = new Schema({
	project: String,
	description: String
});

mongoose.model('Task', Tasks);
var Task = mongoose.model('Task');
var task = new Task();
task.project = 'test';
task.description = 'test description';
task.save(function(err) {
	if (err) {throw err};
	console.log('save');
})

Task.find({_id:"58773e18afa2962e08e2f24c"}, function(err, tasks){
	for(var i = 0; i < tasks.length; i++) {
		console.log(tasks[i].description);
	}
});

// Task.update({_id:"58773e18afa2962e08e2f24c"},
// 	{description: '_id test'},
// 	{multi: false}, 
// 	function(err, tasks){
// 		if (err) throw err;
// 		console.log('update');
// });

Task.remove({ _id: '587742f12177273bdc1bf5be' }, function (err) {
 	if (err) {throw err};
  	console.log('remove')
});

mongoose.disconnect();