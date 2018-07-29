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