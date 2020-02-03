var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');

var samples = 20;
var speed = 250;
let timeout = samples * speed;
var values = {
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
};
var labels = [];
var charts = [];
var value = 0;
var scale = 1;

var originalCalculateXLabelRotation = Chart.Scale.prototype.calculateXLabelRotation

function initialize() {
  charts.push(new Chart(document.getElementById("chart0"), {
    type: 'line',
    data: {
      //labels: labels,
      datasets: [{
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: speed * 1.5,
        easing: 'linear'
      },
      legend: false,
      scales: {
        xAxes: [{
          type: "time",
          display: true
        }],
        yAxes: [{
          ticks: {
            max: 1,
            min: -1
          }
        }]
      }
    }
  }));
}

function rescale() {
  var padding = [];

  values.splice.apply(values, padding);

  scale++;
}

function updateCharts(){
  charts.forEach(function(chart) {
    chart.update();
  });
}


window.onload = function() {
  initialize();
};

//receive details from server
socket.on('newnumber', function(msg) {
  chartData = JSON.parse(msg.output);
  console.log(chartData);

  values.datasets.forEach(dataset => {
    var name = dataset.label;
    var value = chartData[name][0];
    dataset.data.push(value);
  });

  values.datasets.forEach(dataset => {
    if (dataset.data.length === 11) {
      dataset.data.shift();
    }
  });
  updateCharts();
});
