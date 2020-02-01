$(document).ready(function(){
  //connect to the socket server.
  var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
  var numbers_received = [];

  //receive details from server
  socket.on('newnumber', function(msg) {
    // console.log("Received output" + msg.output);
    // //maintain a list of ten numbers
    // numbers_received.push(msg.output);
    // numbers_string = '';
    // for (var i = 0; i < numbers_received.length; i++){
    //     numbers_string = numbers_string + '<p>' + numbers_received[i] + '</p>';
    // }
    // $('#log').html(numbers_string);

    // console.log(msg.output);
    chartData = JSON.parse(msg.output);
    console.log(chartData);

    new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: [9,8,7,6,5,4,3,2,1,0],
        datasets: [{
            data: chartData.delta[""$collections.deque""],
            label: "Delta",
            borderColor: "#3e95cd",
            fill: false
          }, {
            data: chartData.theta[""$collections.deque""],
            label: "Theta",
            borderColor: "#8e5ea2",
            fill: false
          }, {
            data: chartData.lowAlpha[""$collections.deque""],
            label: "lowAlpha",
            borderColor: "#3cba9f",
            fill: false
          }, {
            data: chartData.highAlpha[""$collections.deque""],
            label: "highAlpha",
            borderColor: "#e8c3b9",
            fill: false
          }, {
            data: chartData.lowBeta[""$collections.deque""],
            label: "lowBeta",
            borderColor: "#c45850",
            fill: false
          }, {
            data: chartData.highBeta[""$collections.deque""],
            label: "highBeta",
            borderColor: "#c45850",
            fill: false
          }, {
            data: chartData.lowGamma[""$collections.deque""],
            label: "lowGamma",
            borderColor: "#c45850",
            fill: false
          }, {
            data: chartData.midGamma[""$collections.deque""],
            label: "midGamma",
            borderColor: "#c45850",
            fill: false
          }
        ]
      }
    });
  });
});
