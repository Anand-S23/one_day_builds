var canvas, canvasContext;

var playerData = 
{
    score : 0,
    successfulClick : 0, 
    missClick : 0,
}

var ballState = 
{
    ballPresent : false,
    timeRendered : 0,
    x : 0, y : 0,
    radi : 30,
    colors : ["gray", "red", "blue", 
              "green", "yellow", "purple", 
              "black", "orange", "pink"],
}

window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
}

const timeGameStarted = performance.now();

const framePerSecond = 30;
setInterval(function() {
    update();
    render();
}, 1000/framePerSecond);

document.getElementById("gameCanvas").onclick = handleMouseEvent; 

function handleMouseEvent(evt)
{

    var ballX = Math.abs(evt.pageX - ballState.x);
    var ballY = Math.abs(evt.pageY - ballState.y);

    if (ballX < ballState.radi && ballY < ballState.radi)
    {
        var points = 5000 - timeInterval(performance.now(), true);
        playerData.score += points;
        ++playerData.successfulClick;
        resetBall();
    }
    else
    {
        playerData.score -= 500;
    }

    console.log(playerData.score);
}

function resetBall()
{
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 0, 1600, 1200);

    ballState.ballPresent = false;
    ballState.timeRendered = 0; 
}

function drawCircle(x, y, radi, color)
{
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radi, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function timeInterval(startTime, inMS)
{
    interval = performance.now() - startTime;
    return inMS == true ? interval : interval / 1000;
}

function rand(max,min) 
{
    num = Math.random() * (max - min) + min;
    return num;
}

function update()
{
    var timeSinceStart = timeInterval(timeGameStarted, false);
    var timeSinceRender = timeInterval(ballState.timeRendered, true);

    if (timeSinceRender > 5000)
    {
        resetBall();
        ++playerData.missClick;
    }

    if (timeSinceStart > 20)
    {
        if (confirm(playerData.score))
        {
            window.location.reload();
        }
    }
}

function render()
{
    if (!ballState.ballPresent)
    {
        ballState.x = rand(800, 0);
        ballState.y = rand(600, 0);

        drawCircle(ballState.x, 
                   ballState.y,
                   ballState.radi,
                   ballState.colors[parseInt(rand(10, 0))]);
        
        ballState.timeRendered = performance.now()
        ballState.ballPresent = true;
    }

    // render current score
    // render current time
}