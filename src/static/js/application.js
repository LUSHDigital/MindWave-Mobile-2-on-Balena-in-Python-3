
console.log('hi');

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

    new Chart(document.getElementById("bar-chart"), {
      type: 'bar',
      data: {
        labels: ["delta", "theta", "lowAlpha", "highAlpha", "lowBeta", "highBeta", "lowGamma", "midGamma"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: msg.output
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });
  });
});
