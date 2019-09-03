$(document).ready(function(){
    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
    var numbers_received = [];

    //receive details from server
    socket.on('newnumber', function(msg) {
        console.log("Received output" + msg.output);
        //maintain a list of ten numbers
        numbers_received.push(msg.output);
        numbers_string = '';
        for (var i = 0; i < numbers_received.length; i++){
            numbers_string = numbers_string + '<p>' + numbers_received[i] + '</p>';
        }
        $('#log').html(numbers_string);
        var options = {
        	animationEnabled: true,
        	title: {
        		text: "GDP Growth Rate - 2016"
        	},
        	axisY: {
        		title: "Growth Rate (in %)",
        		suffix: "%",
        		includeZero: false
        	},
        	axisX: {
        		title: "Countries"
        	},
        	data: [{
        		type: "column",
        		yValueFormatString: "#,##0.0#"%"",
        		dataPoints: [
        			{ label: "Iraq", y: 10.09 },
        			{ label: "Turks & Caicos Islands", y: 9.40 },
        			{ label: "Nauru", y: 8.50 },
        			{ label: "Ethiopia", y: 7.96 },
        			{ label: "Uzbekistan", y: 7.80 },
        			{ label: "Nepal", y: 7.56 },
        			{ label: "Iceland", y: 7.20 },
        			{ label: "India", y: 7.1 }

        		]
        	}]
        };
        $("#chartContainer").CanvasJSChart(options);

    });

});
