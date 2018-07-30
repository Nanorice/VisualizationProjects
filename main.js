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

// var layout = {
//     autosize: false,
//     width: 500,
//     height: 150,
//     margin: {
//       l: 50,
//       r: 50,
//       b: 100,
//       t: 100,
//       pad: 4
//     },
//     xaxis: {
//       range: [-1,11],
//       showgrid: false,
//     yaxis: {
//       range: [-2,1],
//       range: [-0.5,0.5],
//       showgrid: false,
//       zeroline: false,
//       showline: false,
//       autotick: false,
//       autotick: false,
//       ticks: '',
//       showticklabels: false
//     },
//     showlegend:false
//   }
// }


var layout12 = {
  autosize: true,
    width: 500,
    height: 120,
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
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-2,2],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  showlegend:false
}

var layout3 = {
  autosize: true,
    width: 500,
    height: 300,
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
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-2,2],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: true,
    ticks: '',
    showticklabels: false
  },
  showlegend:false
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


Plotly.newPlot('graph1', data1, layout12);

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


Plotly.newPlot('graph2', data2, layout12);

// initial plot for figure 3

var nodePlot = {
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

var data3 = [nodePlot];

Plotly.newPlot('graph3', data3, layout3)


function handleElement(){
  let elementNumber = parseFloat($("#element").val());
  $("#element").on("input",reset(elementNumber));
  // .on('change',getShape(elementNumber));
  $("#elementDisplay").html(elementNumber);
  //CHANGE MODE MAX
  let new_max = parseFloat($('input#element').val())+1;
  $('input#modeIndex').attr('max',new_max)
  $('#sliderMax').html(new_max)
  data1 = []; x1 = [];
  // data2 = []; x2 = [];
  // data3 = []; x3 = [];
  updatePlot1(elementNumber);
  // updatePlot2(elementNumber);
  // updatePlot3(elementNumber);
}


function updatePlot1(element) {
  
  for (let i = 0; i < element+1; i++) {
    x1[i] = 10*i/(element);
  }
  for (let i = 0; i < element; i++) {
    segment1[i] = new Array(2);
    segment1[i][0] = x1[i];
    segment1[i][1] = x1[i+1];
    trace1[i] = {
      x: segment1[i],
      y: [0,0],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: 20*Math.random(),
        width: 6,
        opacity: 1
      }
    };
    data1.push(trace1[i]);
  }

  Plotly.react('graph1',data1,layout12);
}


function reset(element){
  for (let i = 0; i < element+1; i++) {
    x[i] = 10*i/element;
    origin[i] = 10*i/element;
  }
}


dt = 0.00001; t = 0; n = 5;

$('.start.button').on('click',()=>{
  $('.start.button').addClass('active');}).on('click',() =>{
  $('.pause.button').removeClass('active');})

$('.pause.button').on('click',()=>{
  $('.pause.button').addClass('active');}).on('click',() =>{
  $('.start.button').removeClass('active');})

$('.start.button').on('click',begin_animation)


function begin_animation(){

  function shakeAnime (){
    // FETCH INFORMATION
    let elementNumber = $("#element").val();
    $("#element").on("change",reset(elementNumber));
    $("#elementDisplay").html(elementNumber);

    let shape = allShapes['ModeShape_' + elementNumber]

    let mode = $("#modeIndex").val();
    $("#ModeDisplay").html(mode);
    $("#modeIndex").on("change",reset(elementNumber));

    let e = $('#EInput').val();
    // $("#dispMag").html(mag);

    let rho = $('#rhoInput').val();
    // $("#dispMag").html(mag);

    let a = $('#aInput').val();
    // $("#dispMag").html(mag);

    let col = $('#colInput').val();
    // $("#dispMag").html(mag);

    let new_max = parseFloat($('input#element').val())+1;
    $('input#modeIndex').attr('max',new_max)
    $('#sliderMax').html(new_max)

    for (let i = 0; i < elementNumber+1; i++) {
      x[i] = 10*i/(elementNumber);
      // yv[i] = -1;
    }

    dt = 0.00001 * 24/elementNumber;
    function computeNode () {

      for (let i = 0; i < elementNumber + 1; i++) {
        t = t+dt;
        x[i] = x[i]+ shape[mode-1][i] * Math.sin(108*t) * 3/(0.1*a)/e/rho;
        y[i] = shape[mode-1][i] * Math.sin(108*t) * 3/rho/e/(0.1*a);
        // yShape[i] = shape[mode-1][i] * Math.sin(108*t);
      }
    };

    for (let i = 0; i < elementNumber+1; i++) {
      origin[i] = 10*i/(elementNumber);
    }

    var verPlot = {
      x: origin,
      y: y,
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: Math.random()*255,
        size: 10
      },
      connectgaps: true
    };

    data3 = [verPlot];
    data2 = [];

    function computeSegment () {
      for (let i = 0; i < elementNumber; i++) {
        segment2[i] = new Array(2);
        segment2[i][0] = x[i];
        segment2[i][1] = x[i+1];
        trace2[i] = {
          x: segment2[i],
          y: [0,0],
          type: 'scatter',
          mode: 'lines',
          opacity: 1,
          line: {
            color: Math.random()*255,
            width: 4
          }
        };
        data2.push(trace2[i]);
      }
    }
    

    computeNode();
    computeSegment();

    let len = data2.length,traceindex=[];

    // HIDE UNUSED SEGMENT
    for (var i = 0; i <25-len; i++) {
      data2.push({opacity: 0})
    }
    for (var i = 0; i < len; i++) {
      traceindex.push(i)
    }

    Plotly.animate('graph2',{data: data2, trace: traceindex},
      { transition: {duration: 0},
        frame: {
          duration: 10,
          redraw: false
        }
      }
    );

    Plotly.animate('graph3',{data: data3, trace: traceindex},
      { transition: {duration: 0},
        frame: {
          duration: 10,
          redraw: false
        }
      }
    );
    return;
  }

  // anim= setInterval(shakeAnime,70);

  // DISPLAY BETWEEN START/PAUSE
  if ($(this).html().toString()=="Start"){
    anim = setInterval(shakeAnime,10);
    $(this).text("Pause")
  }else{
    $(this).text("Start")
    clearInterval(anim)
  };

  // $('.reset.button').on('click',{
  //   $("#element").val() = '24'
  //   // $("#modeIndex").val() = toString(1)
  // }).on('click',(){
  //   clearInterval(anim)
  //   $(this).text("Start")
  // });
}
