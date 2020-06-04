var canvas;
var canvasContext;

var score = 0;
var colors = ["gray", "red", "blue", "green", "yellow", "purple", "black", "brown", "orange", "pink"];

class Ball {
    constructor() {
        this.x = rand(800, 0);
        this.y = rand(600, 0);
        this.radi = rand(50, 20);
        this.color = colors[parseInt(rand(10, 0))];
    }   
    
    draw() {
        canvasContext.fillStyle = this.color;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radi, 0, Math.PI*2, true);
        canvasContext.fill();
    }
    
    reset() {
        this.x = rand(800, 0);
        this.y = rand(600, 0);
        this.radi = rand(50, 20);
        this.color = colors[parseInt(rand(10, 0))];
    }

    clear() {
        canvasContext.fillStyle = "white";
        canvasContext.fillRect(0, 0, 1600, 1200);
    }
    
    /*
    xLoc() {
        return this.x
    }
    
    yLoc() {
        return this.y
    }
    
    radius() {
        return this.radi
    }
    */
    
    incRadi() {
        this.radi += .1;
    }
}

window.onload = function(){
    canvas = document.getElementById("gameCanvas")
    canvasContext = canvas.getContext('2d')
}

const theBall = new Ball();

const framePerSecond = 30;
setInterval(function(){
    moveEverything();
    drawEverything();
}, 1000/framePerSecond);

document.getElementById("gameCanvas").onclick = handleMouseClick

function handleMouseClick(evt){
    var xTest = Math.abs(evt.pageX-theBall.x);
    var yTest = Math.abs(evt.pageY-theBall.y);
    if (xTest < theBall.radi && yTest < theBall.radi){
        theBall.clear();
        theBall.reset();
        score++;
        console.log(score);
    }
    else {
        score--;
    }
}

function moveEverything() {
   theBall.incRadi();
}

function drawEverything() {
    theBall.draw();
}

function rand(max,min) {
    num = Math.random() * (max - min) + min;
    return num;
}
