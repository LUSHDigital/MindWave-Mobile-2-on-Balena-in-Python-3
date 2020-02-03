$(document).ready(function(){
  //connect to the socket server.
  var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
  var numbers_received = [];

  var chart = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: [9,8,7,6,5,4,3,2,1,0]
    },
    options: {
      animation: {
        duration: 0
      }
    }
  });

    //receive details from server
    socket.on('newnumber', function(msg) {
      chartData = JSON.parse(msg.output);
      console.log(chartData);


      // function addData(chart, label, data) {
        // chart.data.labels.push(label);
        chart.data.datasets = [{
            data: Object.values(chartData.delta),
            label: "Delta",
            borderColor: "#3e95cd",
            fill: false
          }, {
            data: Object.values(chartData.theta),
            label: "Theta",
            borderColor: "#8e5ea2",
            fill: false
          }, {
            data: Object.values(chartData.lowAlpha),
            label: "lowAlpha",
            borderColor: "#3cba9f",
            fill: false
          }, {
            data: Object.values(chartData.highAlpha),
            label: "highAlpha",
            borderColor: "#e8c3b9",
            fill: false
          }, {
            data: Object.values(chartData.lowBeta),
            label: "lowBeta",
            borderColor: "#c45850",
            fill: false
          }, {
            data: Object.values(chartData.highBeta),
            label: "highBeta",
            borderColor: "#c45850",
            fill: false
          }, {
            data: Object.values(chartData.lowGamma),
            label: "lowGamma",
            borderColor: "#c45850",
            fill: false
          }, {
            data: Object.values(chartData.midGamma),
            label: "midGamma",
            borderColor: "#c45850",
            fill: false
          }
        ];
        chart.options = {
          animation: {
            duration: 0
          }
        };
        chart.update();
  });
});
