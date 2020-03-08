/*--------------------------------------------------------
1. Jialiang Chang / Mar 07, 2020:

2. Version log :1.written by Mar 07,2020

3. Precise examples / instructions to run this program:
> node app.js

4. Aim: 
  a.connect mongodb
  b.generate a number of data and insert them into mongodb
  c.create ascending index on field "number"
  d.(optional)find all data from mongodb and print them out for testing purpose
  e.close connection to mongodb
  f.check if there exists any error during above steps, if any, then print the err and close the connection

5. Notes:
  a.configuration setting is in /config/config.js
----------------------------------------------------------*/
const mongodb = require('mongodb');
const config = require('./config/config');


function generateRandomIntInc(low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low)
}


function generateRandomDate(date1, date2){
    var date1 = new Date(date1).getTime()
    var date2 = new Date(date2).getTime()
    if( date1>date2){
        return parseInt(new Date(generateRandomIntInc(date2,date1)).toISOString().slice(0,10).replace(/-/g,""),10 )
    } else{
        return parseInt(new Date(generateRandomIntInc(date1, date2)).toISOString().slice(0,10).replace(/-/g,""),10) 

    }
}


module.exports.connect = () => function() {
	let db;
	//connect mongodb with in asynchronous way
	new Promise(function(resolve, reject) {
		mongodb.MongoClient.connect(config.url,{useNewUrlParser: true, useUnifiedTopology: true},function(err, database) {
			if (err) {
				reject(err);
			}
			else {
				db = database;
				resolve();
			}
		});
	})
	.then(function () {
		var array = []; 
		//generate a number of data
		for (var i = 0; i < config.numberOfData; i++) {
			array.push({
				date: generateRandomDate(config.dateRange.start, config.dateRange.end),
				number: generateRandomIntInc(config.numberRange.min, config.numberRange.max)
			});
		};

		//insert them into mongodb
		db.db(config.dbName).collection(config.collectionName).insertMany(array);
	})
	.then(function() {
		//create ascending index on field "number"
		return Promise.all([
			db.db(config.dbName).collection(config.collectionName).createIndex({
				number: 1
			}),
		]);
	})
	.then(function(){
		//find all data from mongodb and print them out for testing purpose
		db.db(config.dbName).collection(config.collectionName).find({}).toArray(function (err, data) {
			console.log(data)
		});
	})
	.then(function() {
		//close connection to mongodb
		console.log('Random date generated successfully.');
		db.close();
		return Promise.resolve();
	})
	.catch(function(err) {
		//handle errors and clos connection if necessary
		console.log(err);
		if (db) {
			db.close();
		}
		return Promise.reject(err);
	});
}();