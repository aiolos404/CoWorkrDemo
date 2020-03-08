/*--------------------------------------------------------
1. Jialiang Chang / Mar 08, 2020:

2. Version log :1.written by Mar 08,2020

3. Precise examples / instructions to run this program:
> MONGO_URL='mongodb://steve:86563178@3.83.120.144:27017/coworkr' meteor 

4. Aim: handle connection to mongoDB

5. Notes:
----------------------------------------------------------*/
import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('documents');

