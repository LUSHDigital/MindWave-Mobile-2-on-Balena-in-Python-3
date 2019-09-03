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
        $('#chart').html(<img src="foo.jpg" alt="MidWave Bar Chart">);
    });

});
