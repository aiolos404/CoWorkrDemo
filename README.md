coWorkr Test Project
============

![Sample Chart](<https://github.com/coWorkr-InSights/codeProject/raw/master/sample.png>)

## Project Summary

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


### Extras:

We use the following packages on the site.  If you have time and want to use them would be a plus.

* https://materializecss.com - Front end CSS framework

* https://c3js.org - One of the charting packages we use.

* https://www.chartjs.org - Another one.
