coWorkr Test Project Demo
============

![Prototype](<https://github.com/aiolos404/CoWorkrDemo/raw/master/prototype.png>)

## Project Summary
Demo can be accessed through http://54.81.222.159/


### Objective
Quick test website to show proficiency in Linux, [Meteor](https://www.meteor.com), [MongoDb](https://docs.mongodb.com/manual/), Javascript, [NodeJS](https://nodejs.org), Git and general web/server coding.

### Goals
Put together a GCE instance with a simple actively updating graph of random data.  Time vs Random number.

### Outline
A quick GCE or AWS server instance running meteor and MongoDb.  

* Clone/Fork this repository for the project code.

* Create a free GCE or AWS instance running Ubuntu 18 with HTTP/HTTPS ports open.

* Install the free version of [MongoDB 4.2](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

* Install [Meteor](https://www.meteor.com) and [NodeJS](https://nodejs.org).

* Create a server script that randomly updates a Mongo collection with time series data.  (Date, Number).  Create an appropriate index for the collection.  You can use whatever you want but most of our server scripts are in NodeJS using the Mongo NPM driver.  So that would be a plus.

* Create a Meteor website page (no login required) that activity pulls and updates a graph with the last 20 or so elements from the collection.  Pick whatever open source graphing/charting package you would like to use.  Note: We use [coffeeScript](https://coffeescript.org) and the [Blaze](http://blazejs.org) front end for meteor so you will need to understand those but the system is able to use just plain JS and other frontend frameworks side by side with the above. 

* The data should be supplied to the client using Meteor sub/pub system.

* Use GitHub and Git to upload the code to the cloned repository, so we can take a look.  Only document what is not obvious by reading the code.

### Implementation
mongoDBScript is node.js based application to randomly generate {"date","number"} data in mongoDB

* Implement a random data generator with node.js. The number of data that will be generated is set to 500 by default every time this script is executed.

* The data are inserted into remote mongoDB, which is hosted on AWS instance[3.83.120.144], through plain Mongo NPM driver.


codeProject is meteor application that implement the Goals and Outline

* Meteor website is hosted on AWS instance[54.81.222.159] and listening to port 80, on Ubuntu 18 LTS.

* This AWS instance opens all possible ports for experimental purpose.

* The server/main.js pulls the data with connection from imports/api/mongodb.js and publish them to client/main.js

* client/main.js subscribes the data and randomly pick 20 among them, draws 1 scatter chart.js chart and 1 timeseries c3.js chart with picked data on client/main.html

* client/main.js also set a function for button to reload data to update these 2 charts. Every time buton is clicked, another 20 randomly picked data will be used to update charts.

* The data that used to draw charts will always be same, even after the button is clicked.

* client/main.html is designed with [Blaze](http://blazejs.org) template and decorated with [Materialize](http://materializecss.com). Basic [design](https://materializecss.com/templates/starter-template/preview.html ) is referring to demo provided by Materialize

The screenshots are uploded into pics folder for reference

### How To Run?
mongoDBScript: 
```	
node app.js
```

codeProject: 
```
sudo MONGO_URL='mongodb://steve:86563178@3.83.120.144:27017/coworkr' meteor --port 80 --allow-superuser
```


### ToDo

* Familiarize coffeescript.
* Write tests for the application.
* Add more interesting features, like MQTT support.

### Extras:

We use the following packages on the site.  If you have time and want to use them would be a plus.

* https://materializecss.com - Front end CSS framework

* https://c3js.org - One of the charting packages we use.

* https://www.chartjs.org - Another one.
