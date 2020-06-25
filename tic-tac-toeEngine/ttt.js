var canvas, canvasContext;

window.onload = function() {
    main()
}

function main()
{
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    console.log(canvasContext)
}

function drawCircle(x, y, radi, color)
{
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radi, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawBoard()
{
    drawCircle(10, 10, 30, "yellow");
}

drawBoard();

const framePerSecond = 30;
setInterval(function() {
    update();
    render();
}, 1000/framePerSecond);

document.getElementById("gameCanvas").onclick = handleMouseEvent; 

function handleMouseEvent(evt)
{
}

function update()
{
}

function render()
{
}