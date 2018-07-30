// initialize node coordinates
let x = [], origin = [];
y = new Array(25).fill(0);
for (let i = 0; i < 25; i++) {
  x[i] = 10*i/25;
  origin[i] = 10*i/25;
}
// input mode shapes for 24-element rod
let allShapes = {};
$.getJSON('https://cdn.rawgit.com/Nanorice/VisualizationProjects/d5af58de/jsonModeShape.json',function(allShape){
allShapes=allShape
});

const layout = {
    autosize: false,
    width: 500,
    height: 150,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4
    },
    xaxis: {
      range: [-1,11],
      showgrid: false,
    yaxis: {
      range: [-2,1],
      range: [-0.5,0.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend:false
  }
}

// initial plot for figure 1

var data1 = [];

let segment1 = new Array(24), trace1 = new Array(24);
for (let i = 0; i < 24; i++) {
  segment1[i] = new Array(2);
  segment1[i][0] = x[i];
  segment1[i][1] = x[i+1];
  trace1[i] = {
    x: segment1[i],
    y: [0,0],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: i*5,
      width: 4
    }
  };
  data1.push(trace1[i]);
}


Plotly.plot('graph1', data1, layout);

// initial plot for figure 2

var data2 = [];

let segment2 = new Array(24), trace2 = new Array(24);
for (let i = 0; i < 24; i++) {
  segment2[i] = new Array(2);
  segment2[i][0] = x[i];
  segment2[i][1] = x[i+1];
  trace2[i] = {
    x: segment2[i],
    y: [0,0],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: i*5,
      width: 4
    }
  };
  data2.push(trace2[i]);
}


Plotly.plot('graph2', data2, layout);

// initial plot for figure 3

var data3 = [];

