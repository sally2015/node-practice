var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/test';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");

 	insertDoc(db, function(){
 		 db.close();
 	});

 	updateDocument(db, function(result){
 		 db.close();
 	});
 	deleteDocument (db, function(result){
 		 db.close();
 	});
 	findAll (db, function(result){
 		 db.close();
 	})
});

function insertDoc(db, cb) {
	var collection = db.collection('documents');
	// collection.insert({a: 4}, {safe: true}, function(err, result){
	// 	if (err) { throw err };
	// 	console.log('insert sucess')
	// 	cb(result);
	// });
	collection.insertMany([
		{a: 1}, {a: 2}, {a: 3}
	], {safe: true}, function(err, result){
		if (err) { throw err };
		console.log('insert sucess')
		cb(result);
	});

}

function updateDocument (db, cb) {
	var collection = db.collection('documents');
	collection.updateOne({a: 2}, {$set: {b: 1} }, function(err, result){
		console.log('update sucess')
		cb(result);
	});
}

function deleteDocument (db, cb) {
	var collection = db.collection('documents');
	collection.deleteMany({a: 3}, function(err, result){
		console.log('delete sucess')
		cb(result);
	});
}

function findAll (db, cb) {
	var collection = db.collection('documents');
	collection.find({}).toArray(function(err, docs) {
		console.log('find all sucess');
		console.log(docs);
		cb();
	})
}