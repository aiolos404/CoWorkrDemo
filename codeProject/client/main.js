/*--------------------------------------------------------
1. Jialiang Chang / Mar 08, 2020:

2. Version log :1.written by Mar 08,2020

3. Precise examples / instructions to run this program:
> MONGO_URL='mongodb://steve:86563178@3.83.120.144:27017/coworkr' meteor 

4. Aim: 
  a.subscribe data from server/main.js
  b.if subscribed data are ready, fetch all of them and randomly pick 20 among them into data subset
  c.sort data subset by ascending order on date
  d.convert data subset to appropriate formats for chart.js scatter chart and c3.js timeseries chart  
  e.set configurations of chart.js scatter chart and c3.js timeseries chart and draw them in html
  f.add a button to repick another 20 data from subscribed data, convert formats and update the two charts

5. Notes:
----------------------------------------------------------*/
import {
    Template
} from 'meteor/templating';
import Chart from 'chart.js';
import c3Chart from './js/c3.js';
import 'chartjs-plugin-trendline';
import 'chartjs-plugin-colorschemes';
import {
    Tasks
} from '../imports/api/mongodb.js';

import './main.html';

//generate array in range of "start" to "end" 
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

//convert the format of data subset into a format that fits c3.js chart
function generateDataForC3JS(ds) {
    var dataDate = ['x'];
    var dataNumber = ['number'];
    var data = [];
    for (var i = 0; i < ds.length; i++) {
    	if (ds[i].date !== undefined && ds[i].date !== null &&ds[i].number !== undefined && ds[i].number !== null ) {
			dataDate.push(String(ds[i].date));
        	dataNumber.push(ds[i].number);
    	}
        
    }
    return [dataDate, dataNumber];
}

//convert the format of data subset into a format that fits chart.js chart
function generateDataForChartJS(ds) {
    var data = [];
    for (var i = 0; i < ds.length; i++) {
        data.push({
            x: ds[i].date,
            y: ds[i].number
        });
    }
    return data;
}

//randomly pick "count" data among "arr" array and puch them into an array
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}


if (Meteor.isClient) {
	Template.charts.onRendered(function() {
	    let dataset;
	    var dataSub = Meteor.subscribe('tasks');//hanlder to check if the subscribed data are ready
	    Tracker.autorun(() => {
	        // Tracker.autorun allows you to run a function that depends on reactive data sources
	        // if the subsceibed data are ready
	        if (dataSub.ready()) {

	        	//data source for chart.js scatter chart
	            dataArray = Tasks.find({}).fetch();//fetch them as array
	            dataSubarray = getRandomArrayElements(dataArray, 20)//randomly pick 20
	            dataSubarray.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))//sort them by ascending order of "date"
	            dataset = generateDataForChartJS(dataSubarray)//convert format into chart.js format

	            //configuration for chart.js scatter chart
	            var scatterChart = new Chart("scatterChart", {
	                type: 'scatter',
	                data: {
	                    datasets: [{
	                        data: dataset,
	                        borderColor: '#2196f3', 
	                        backgroundColor: '#2196f3',
					    	trendlineLinear: {
						        style: "rgba(0,128,0, .8)",
						        lineStyle: "dotted|solid",
						        width: 2
						    }

	                    }]
	                },
	                options: {
	                    scales: {
	                        xAxes: [{
	                            type: 'linear',
	                            position: 'bottom',
	                            gridlines:true
	                        }],
	                        yAxes: [{
	                            display: true,
	                            ticks: {
	                                beginAtZero: true,
	                                steps: 100,
	                                stepValue: 5,
	                                min: 0,
	                                max: 1000
	                            },
	                            gridlines:true
	                        }]
	                    },
	                    title: {
	                        display: false,
	                        text: 'Scatter chart'
	                    },
	                    legend: {
	                        display: false,

	                    },
	                    plugins: {
				            colorschemes: {
				                scheme: 'brewer.Spectral11',
				                override:true
				            }
				        }

	                }

	            });


	            //data source for c3.js scatter chart
	            dataset = generateDataForC3JS(dataSubarray)
	            var datasetX = dataset[0]//data for "date"
	            var datasetY = dataset[1]//data for "number"


	            //configuration for c3.js scatter chart
	            var timeseriesChart = c3Chart.generate({
	                bindto: '#c3Charts',
	                data: {
	                    x: 'x',
	                    xFormat: '%Y%m%d',
	                    columns: [datasetX, datasetY]
	                },
	                axis: {
	                    x: {
	                        type: 'timeseries',
	                        tick: {
	                            format: '%Y%m%d'
	                        }
	                    }
	                }
	            });


	            //button to repick another 20 data from subscribed data, convert formats and update the two charts
	            $("#refreshButton").on("click", function() {
	                dataSubarray = getRandomArrayElements(dataArray, 20).sort()
	                dataSubarray.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
	                dataset = generateDataForChartJS(dataSubarray)
	                scatterChart.data.datasets[0].data = dataset;
	                scatterChart.update();

	                dataset = generateDataForC3JS(dataSubarray)
	                datasetX = dataset[0]
	                datasetY = dataset[1]
	                timeseriesChart.load({
	                    columns: [datasetX, datasetY]
	                });
	                timeseriesChart.flush();
	            });

	        }
	    }); 
	});
}