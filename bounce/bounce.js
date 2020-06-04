var canvas;
var canvasContext;

var ballX = 400;
var ballY = 300;
var speedX = 10;
var speedY = 10;

var i = 0;
var colors = ["white", "red", "blue", "pink", "purple", "green", "yellow", "gray"];

window.onload = function(){
    canvas = document.getElementById("gameCanvas")
    canvasContext = canvas.getContext('2d')
}

const framePerSecond = 30;
setInterval(function(){
    moveEverything();
    drawEverything();
}, 1000/framePerSecond);

document.getElementById("gameCanvas").onclick = handleMouseClick

function handleMouseClick(evt){
    if (i < 6){
        i++;
    }
    else{
        i = 0;
    }
}

function moveEverything(){
    ballX += speedX;
    ballY += speedY;

    if (ballX <= 0 || ballX >= 800){
        speedX = -speedX;
        speedX += .5;
    }

    if (ballY <= 0 || ballY >= 600){
        speedY = -speedY;
        speedY += .5;
    }

}

function drawEverything(){
    colorRect(0, 0, 800, 600, "black");

    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
    canvasContext.fillStyle = colors[i];
    canvasContext.fill();
}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, leftY, cwidth, cheight, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, leftY, cwidth, cheight);
}