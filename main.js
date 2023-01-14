var screenSize = 500

var angulo1 = 0;
var angulo2 = 0;
var tamanhoInicial = 100;
var razaoT = 0.7;

var depthLim = 9;

var coloredMode = false;
var colorOffset = 0;

function setup() {
    createCanvas(screenSize, screenSize);
}

function draw() {
    background(0);

    angulo1 = map(mouseX,0,width,0,PI);
    angulo2 = map(mouseY,0,width,0,PI);

    strokeWeight(0.8);
    if(coloredMode) {
        colorMode(HSB);
        stroke((colorOffset - 360/depthLim) %360,100,100);
    }
    else {
        colorMode(RGB)
        stroke(255);
    }

    translate(width/2, height);

    line(0,0,0,-tamanhoInicial*2);

    translate(0,-tamanhoInicial*2);

    galhos(tamanhoInicial*razaoT, 0);

    colorOffset++
}

function galhos(tamanho, depth) {
    if(depth > depthLim) return

    rotate(angulo1);

    if(coloredMode) stroke((map(depth, 0, depthLim, 0, 360) + colorOffset) % 360,100,100);
    line(0,0,0,-tamanho);

    translate(0,-tamanho);
    galhos(tamanho*razaoT, depth+1);
    translate(0,tamanho);

    rotate(-angulo1);
    rotate(-angulo2);

    if(coloredMode) stroke((map(depth, 0, depthLim, 0, 360) + colorOffset) % 360,100,100);
    line(0,0,0,-tamanho);

    translate(0,-tamanho);
    galhos(tamanho*razaoT, depth+1);
    translate(0,tamanho);
        
    rotate(angulo2);
}

function mouseWheel(event) {
    if (event.deltaY < 0) depthLim += 1;
    else depthLim -= 1;
    
    if(depthLim < 0) depthLim = 0;
}

function mousePressed() {
    coloredMode = !coloredMode;
}