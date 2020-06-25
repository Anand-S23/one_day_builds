import { Vale } from "./vale"

var x = 100; 
var y = 100;
var dx = 5; 
var dy = 5;

window.onload = () => Vale.Create(800, 600);

draw = () => {
    Vale.Clear();
    Vale.Circle(x, y, 30, "red");
    x += dx; 
    y += dy; 

    if (x >= Vale.Width || x <= 0)
    {
        dx *= -1;
    }
    if (y >= Vale.Height || y <= 0)
    {
        dy *= -1;
    }
}

MousePressed = (event) => console.log(event);

main = () => {
    draw();
} 