/*--------------------------------------------------------
1. Jialiang Chang / Mar 07, 2020:

2. Version log :1.written by Mar 07,2020

3. Precise examples / instructions to run this program:
> node app.js

4. Aim: generate a certain number of data and insert them into mondodb

5. Notes:
  a.this is the entry point of the node.js script
  b.configuration setting is in /config/config.js
----------------------------------------------------------*/
var config = require('./config/config');
var mongo = require('./mongoDB');

mongo.connect();

