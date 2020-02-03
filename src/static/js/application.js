$(document).ready(function(){
  //connect to the socket server.
  var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
  var numbers_received = [];

  var chart = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: [9,8,7,6,5,4,3,2,1,0],
      datasets: [
        {
          data: [],
          label: "delta",
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: [],
          label: "theta",
          borderColor: "#8e5ea2",
          fill: false
        },
        {
          data: [],
          label: "lowAlpha",
          borderColor: "#3cba9f",
          fill: false
        },
        {
          data: [],
          label: "highAlpha",
          borderColor: "#e8c3b9",
          fill: false
        },
        {
          data: [],
          label: "lowBeta",
          borderColor: "#c45850",
          fill: false
        },
        {
          data: [],
          label: "highBeta",
          borderColor: "#c45850",
          fill: false
        },
        {
          data: [],
          label: "lowGamma",
          borderColor: "#c45850",
          fill: false
        },
        {
          data: [],
          label: "midGamma",
          borderColor: "#c45850",
          fill: false
        }
      ]
    },
    options: {
        animation: {
            onProgress: function(animation) {
                progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
            }
        }
    }
  });

  //receive details from server
  socket.on('newnumber', function(msg) {
    chartData = JSON.parse(msg.output);
    console.log(chartData);

    chart.data.datasets.forEach(dataset => {
      var name = dataset.label;
      var value = chartData[name][0];
      dataset.data.push(value);
    });

    chart.data.datasets.forEach(dataset => {
      if (dataset.data.length === 11) {
        dataset.data.shift();
      }
    });

    chart.update();
  });
});
