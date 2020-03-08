/*--------------------------------------------------------
1. Jialiang Chang / Mar 07, 2020:

2. Version log :1.written by Mar 07,2020

3. Precise examples / instructions to run this program:
> node app.js

4. Aim: settings that will be used in script

5. Notes:
  a.numberOfData: 	number of data will be generated
  b.url: 			mongodb url, can be local or remote url
  c.dbName: 		name of database of mongodb
  d.collectionName: name of collection of mongodb
  e.numberRange: 	range of random value for "number" field in collection, "min" for minimum and max "for" maximum
  e.dateRange: 		range of random value for "date" field in collection, "start" for start date and "end" for end date
----------------------------------------------------------*/
module.exports = {
	"numberOfData":500,
	"url":'mongodb://steve:86563178@3.83.120.144:27017/?authSource=coworkr&readPreference=primary&appname=MongoDB%20Compass&ssl=false',
	"dbName":'coworkr',
	"collectionName":'documents',
	"numberRange":{
		"min":1,
		"max":1000
	},
	"dateRange":{
		"start":'01/01/2020',
		"end":'03/01/2020'
	}
};