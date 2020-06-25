var canvas, canvasContext;

var boardState = 
{
    playerTurn : true,
    move : 0,
    gameOver : false,
    board : [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]]
}

window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
}

const framePerSecond = 30;
setInterval(function() {
    update();
}, 1000/framePerSecond);

document.getElementById("gameCanvas").onclick = handleMouseEvent; 

function rand(min, max) 
{
    num = Math.random() * (max - min) + min;
    return num;
}

function handleMouseEvent(evt)
{
    if (boardState.playerTurn && !boardState.gameOver)
    {
        var x, y;

        if (evt.pageX > 0 && evt.pageX < 200) { x = 0; }
        if (evt.pageX > 200 && evt.pageX < 400) { x = 1; }
        if (evt.pageX > 400 && evt.pageX < 600) { x = 2; }

        if (evt.pageY > 0 && evt.pageY < 200) { y = 0; }
        if (evt.pageY > 200 && evt.pageY < 400) { y = 1; }
        if (evt.pageY > 400 && evt.pageY < 600) { y = 2; }

        if (boardState.board[y][x] == 0)
        {
            boardState.board[y][x] = 1;
            ++boardState.move;
            boardState.playerTurn = false;
        }
    }
}

function minimax()
{
}

function computer()
{
    for (i = 0; i < boardState.board.length; ++i)
    {
        for (j = 0; j < boardState.board[i].length; ++j)
        {
            if (boardState.board[i][j] == 0) 
            { 
                return [i, j];
            }
        }
    }
}

function equals(a, b, c)
{
    return (a == b && b == c && a != 0) ? true : false;
}

function checkWin()
{
    if (boardState.move >= 9)
    {
        boardState.gameOver = true;
        return 0;
    }

    for (i = 0; i < boardState.board[0].length; ++i)
    {
        if (equals(boardState.board[i][0], boardState.board[i][1], boardState.board[i][2]))
        {
            boardState.gameOver = true;
            return boardState.board[i][0];
        }
    }

    for (i = 0; i < boardState.board.length; ++i)
    {
        if (equals(boardState.board[0][i], boardState.board[1][i], boardState.board[2][i]))
        {
            boardState.gameOver = true;
            return boardState.board[0][i];
        }
    }

    if (equals(boardState.board[0][0], boardState.board[1][1], boardState.board[2][2]))
    {
        boardState.gameOver = true;
        return boardState.board[0][0];
    }

    if (equals(boardState.board[2][0], boardState.board[1][1], boardState.board[0][2]))
    {
        boardState.gameOver = true;
        return boardState.board[2][0];
    }

    return -1;
}

function drawLine(x1, y1, x2, y2)
{
    canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
}

function drawCircle(x, y, radi, color)
{
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radi, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawX(centerX, centerY)
{
    drawLine(centerX - 90, centerY - 90, centerX + 90, centerY + 90);
    drawLine(centerX + 90, centerY - 90, centerX - 90, centerY + 90);
}

function drawO(centerX, centerY)
{
    drawCircle(centerX, centerY, 90, "black");
    drawCircle(centerX, centerY, 88, "white");
}

function drawBoard()
{
    drawLine(200, 0, 200, 600);
    drawLine(400, 0, 400, 600);
    drawLine(0, 200, 600, 200);
    drawLine(0, 400, 600, 400);
}

function render()
{
    drawBoard();

    for (i = 0; i < boardState.board.length; ++i)
    {
        for (j = 0; j < boardState.board[i].length; ++j)
        {
            if (boardState.board[i][j] == 1) { drawX(j * 200 + 100, i * 200 + 100); }
            if (boardState.board[i][j] == 2) { drawO(j * 200 + 100, i * 200 + 100); }
        }
    }
}

function update()
{
    render();

    if (checkWin() != -1)
    {
        if (checkWin() == 0) 
        {
            if (confirm("It's a tie!")) { window.location.reload(); }
        }
        if (checkWin() == 1) 
        {
            if (confirm("You Win!")) { window.location.reload(); }
        }
        if (checkWin() == 2) 
        {
            if (confirm("You Lose, Try Again! :(")) { window.location.reload(); }
        }
    }

    if (!boardState.playerTurn && !boardState.gameOver)
    {
        var computerMove = computer();
        boardState.board[computerMove[0]][computerMove[1]] = 2;
        ++boardState.move;
        boardState.playerTurn = true;
    }

    render();

    if (checkWin() != -1)
    {
        if (checkWin() == 0) 
        {
            if (confirm("It's a tie!")) { window.location.reload(); }
        }
        if (checkWin() == 1) 
        {
            if (confirm("You Win!")) { window.location.reload(); }
        }
        if (checkWin() == 2) 
        {
            if (confirm("You Lose, Try Again! :(")) { window.location.reload(); }
        }
    }
}