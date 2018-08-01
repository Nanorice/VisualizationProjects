/*
function setup(){
    createCanvas(640,480);
    background(0);
}

function draw(){
    // line(50-1,75-1,0-1, 150-1);
    // line(50-1,75-1,0-1, 150-1);
    // line(50-1,75-1,0-1, 150-1);
    // triangle(30, 300, 80, 220, 80, 300);
    // stroke(255)
    // rect(80, 218, 50, 82);
    stroke(255);
    quad(30, 300, 80, 220, 130, 220, 180, 300);

    stroke(155);
    ellipse(30, 300, 10, 10);
    ellipse(80, 220, 10, 10);
    ellipse(130, 220, 10, 10);
    ellipse(180, 300, 10, 10);
    ellipse(80, 300, 10, 10);
    ellipse(130, 300, 10, 10);
}
*/
var ele_nod_x = [], ele_nod_y = [];
var nod_coor_x = [], nod_coor_y = [];
nod_coor_x = [0, 5, 5, 10, 10, 15];
nod_coor_y = [0, 7.5, 0, 7.5, 0, 0];
var x = [], y =[], xd = [], yd = [];
x = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];
var layout = {
    autosize: true,
    width: 400,
    height: 300,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
  xaxis: {
    range: [-2,18],
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-1,9],
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  showlegend:false,
  annotations: [
    {
      x: 4.5,
      y: 7.5,
      xref: 'x',
      yref: 'y',
      text: 'F',
      showarrow: true,
      arrowhead: 2,
      ax: -40,
      ay: 0
    }
  ]
}
let shape = {
    x: x,
    y: y,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: true
}; 

var data = [shape];

Plotly.plot('graph1', data, layout)

function handleForce(){
    let forceMag = parseFloat($("#forceMag").val());
    $("#forceDisplay").html(forceMag);
    //CHANGE MODE MAX
    let new_max = parseFloat($('input#element').val())+1;
    $('input#modeIndex').attr('max',new_max)
    $('#sliderMax').html(new_max)
    data1 = []; x1 = [];
    updatePlot1(forceMag);
}


let shapes = {}, coord = new Array(2);
$.getJSON('https://cdn.rawgit.com/Nanorice/VisualizationProjects/d4cc8a00/trussDeformedShape.json',function(shape){
shapes=shape
});

function updatePlot1(forceMag){
    let force = 1e6/20*forceMag;
    console.log(forceMag)
    let coord = shapes['deformedCoord_' + forceMag];
    console.log(coord)
    xd = [coord[0][0], coord[0][1], coord[0][3], coord[0][5], coord[0][4], coord[0][3], coord[0][2], coord[0][4], coord[0][1], coord[0][2], coord[0][0]];
    yd = [coord[1][0], coord[1][1], coord[1][3], coord[1][5], coord[1][4], coord[1][3], coord[1][2], coord[1][4], coord[1][1], coord[1][2], coord[1][0]];
    shape = {
        x: xd,
        y: yd,
        type: 'scatter',
        mode: 'markers+lines',
        marker: {
          color: Math.random()*50,
          size: 10
        },
        line: {
            dash: 'dot'
        },
        connectgaps: true
    }; 
    data = [shape];
    // layout.annotations.x = 4.5 + (forceMag/10);
    // layout.annotations.ax = -40 - (forceMag*3);
    layout = {
        annotations: [
            {
              x: 4.5 + (forceMag/10),
              y: 7.5,
              xref: 'x',
              yref: 'y',
              text: 'F',
              showarrow: true,
              arrowhead: 2,
              ax: -40 - (forceMag*3),
              ay: 0
            }
          ]
    }
    Plotly.react('graph1',data,layout)
    
}

// plot for 2.2
let x2a = [], x2b = [], y2a = [], y2b = [];
x2a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], 5+(10/3)];
y2a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], 5];

x2b = [5+(5/3), nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y2b = [2.5, nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

var layout2 = {
    autosize: true,
    width: 400,
    height: 300,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
  xaxis: {
    range: [-2,18],
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-1,9],
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  showlegend:false,
  annotations: [
    {
      x: 4.5,
      y: 7.5,
      xref: 'x',
      yref: 'y',
      text: 'F',
      showarrow: true,
      arrowhead: 2,
      ax: -40,
      ay: 0
    }
  ]
}
let trace2a = {
    x: x2a,
    y: y2a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: true
}; 

let trace2b = {
    x: x2b,
    y: y2b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: true
}; 

var data2a = [trace2a];

Plotly.newPlot('graph2', data2a, layout2)

var data2b = [trace2b];

Plotly.plot('graph2', data2b, layout2)

// plot for 2.3

x2a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], 5+(10/3)];
y2a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], 5];

x2b = [5+(5/3), nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y2b = [2.5, nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

var layout3 = {
    autosize: true,
    width: 400,
    height: 300,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
  xaxis: {
    range: [-2,18],
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-1,9],
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  showlegend:false,
  annotations: [
    {
      x: 7.9,
      y: 4.35,
      xref: 'x',
      yref: 'y',
      text: '',
      showarrow: true,
      arrowhead: 2,
      ax: 15,
      ay: -30
    },
    {
        x: 7.2,
        y: 3.3,
        xref: 'x',
        yref: 'y',
        text: '',
        showarrow: true,
        arrowhead: 2,
        ax: -15,
        ay: 30
      }
  ]
}

Plotly.newPlot('graph3', data2a, layout3)

Plotly.plot('graph3', data2b, layout3)

// plot for 3.4

let x4a = [], x4b = [], y4a = [], y4b = [];
x4a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], 5+(10/3)];
y4a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], 5];

x4b = [5+(5/3), nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
y4b = [2.5, nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

var layout4 = {
    autosize: true,
    width: 400,
    height: 300,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
  xaxis: {
    range: [-2,18],
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-1,9],
    showgrid: true,
    zeroline: false,
    showline: true,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  showlegend:false,
  annotations: [
    {
      x: 7.9,
      y: 4.35,
      xref: 'x',
      yref: 'y',
      text: '',
      showarrow: true,
      arrowhead: 2,
      ax: 15,
      ay: -30
    },
    {
        x: 7.2,
        y: 3.3,
        xref: 'x',
        yref: 'y',
        text: '',
        showarrow: true,
        arrowhead: 2,
        ax: -15,
        ay: 30
      }
  ]
}
let trace4a = {
    x: x4a,
    y: y4a,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: true
}; 

let trace4b = {
    x: x4b,
    y: y4b,
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: Math.random()*50,
      size: 10
    },
    connectgaps: true
}; 

var data4 = [trace4a, trace4b];

Plotly.newPlot('graph4', data4, layout4)

function handleX(){
    let x = parseFloat($("#x").val());
    $("#xDisplay").html(x);
    updatePlot2(x)
}

function calY(x){
    return 1.5*x-7.5;
}

function updatePlot2(x){
    x4a = [nod_coor_x[0], nod_coor_x[1], nod_coor_x[3], nod_coor_x[5], nod_coor_x[4], nod_coor_x[3], 15-x];
    y4a = [nod_coor_y[0], nod_coor_y[1], nod_coor_y[3], nod_coor_y[5], nod_coor_y[4], nod_coor_y[3], calY(15-x)];
    
    x4b = [x, nod_coor_x[2], nod_coor_x[4], nod_coor_x[1], nod_coor_x[2], nod_coor_x[0]];
    y4b = [calY(x), nod_coor_y[2], nod_coor_y[4], nod_coor_y[1], nod_coor_y[2], nod_coor_y[0]];

    trace4a = {
        x: x4a,
        y: y4a,
    }; 
    
    trace4b = {
        x: x4b,
        y: y4b,
    };

    data4 = [trace4a, trace4b];
    
    Plotly.react('graph4', data4, layout4)
}

function handleForce(){
    let forceMag = parseFloat($("#forceMag").val());
    $("#forceDisplay").html(forceMag);
    //CHANGE MODE MAX
    let new_max = parseFloat($('input#element').val())+1;
    $('input#modeIndex').attr('max',new_max)
    $('#sliderMax').html(new_max)
    data1 = []; x1 = [];
    updatePlot1(forceMag);
}

