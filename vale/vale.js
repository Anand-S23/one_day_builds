var Vale = {
    canvas : null, 
    canvasContext : null,
    Width : 0,
    Height : 0,
    Create : (width, height) => {
        canvas_element = document.createElement("canvas");
        canvas_element.setAttribute("width", width.toString());
        canvas_element.setAttribute("height", height.toString());
        canvas_element.setAttribute("id", "gameCanvas");
        document.body.appendChild(canvas_element);

        Vale.canvas = document.getElementById("gameCanvas");
        Vale.canvasContext = Vale.canvas.getContext('2d');

        Vale.canvas.addEventListener("mousemove", Vale.MousePos, false);
        Vale.canvas.addEventListener("keydown", Vale.KeyDown, false);
        Vale.canvas.onclick = Vale.MouseClick; 

        Vale.Width = width; 
        Vale.Height = height;

        return setInterval( () => { try{ main(); } catch{} }, 1000 / 30);
    },

    Custom : (name, width, height) => {
        Vale.canvas = document.getElementById(name);
        Vale.canvasContext = Vale.canvas.getContext('2d');

        Vale.canvas.addEventListener("mousemove", Vale.MousePos, false);
        Vale.canvas.addEventListener("keydown", Vale.KeyDown, false);
        Vale.canvas.onclick = Vale.MouseClick; 

        Vale.Width = width; 
        Vale.Height = height;
    },

    // Input (mouse / keyboard)

    MouseX : 0,
    MouseY : 0,
    MousePos : (event) => {
        Vale.MouseX = event.clientX; 
        Vale.MouseY = event.clientY;
        try { GetMousePos(event); }
        catch {}
    },

    MouseClick : (event) => {
        try { MouseClicked(event); }
        catch {}
    },

    KeyDown : (event) => {
        try { GetKeyDown(event); }
        catch {}
    },

    // Rendering

    Line : (x1, y1, x2, y2) => {
        Vale.canvasContext.beginPath();
        Vale.canvasContext.moveTo(x1, y1);
        Vale.canvasContext.lineTo(x2, y2);
        Vale.canvasContext.stroke();
    },

    Circle : (x, y, radi, color) => {
        Vale.canvasContext.fillStyle = color;
        Vale.canvasContext.beginPath();
        Vale.canvasContext.arc(x, y, radi, 0, Math.PI * 2, true);
        Vale.canvasContext.fill();
    }, 

    Rect : (originX, originY, width, height, color) => {
        Vale.canvasContext.fillStyle = color;
        Vale.canvasContext.fillRect(originX, originY, width, height);
    },

    Clear : (color = "white") => {
        Vale.Rect(0, 0, Vale.Width, Vale.Height, color);
    },

    Image : (src, x, y, width=null, height=null) => {
        var image = new Image();
        image.src = src;
        if (width !== null && height !== null) {
            Vale.canvasContext.drawImage(image, x, y, width, height);
        }
        else {
            Vale.canvasContext.drawImage(image, x, y);
        }
    },

    Font : "48px serif",
    Text : (text, color = "black", x, y) => {
        Vale.canvasContext.font = Vale.Font;
        Vale.canvasContext.fillStyle(color);
        Vale.canvasContext.fillText(text, x, y);
    },

    // Sound

    Sound : () => {

    },

}

// TODO: 
// Sound
// Text



// -------------- // 
// ---  Game  --- //
// -------------- // 

var x = 100; 
var y = 100;
var dx = 5; 
var dy = 5;

window.onload = () => Vale.Create(800, 600);

draw = () => {
    Vale.Image("background.png", 0, 0, 800, 600);
    //Vale.Clear();
    Vale.Circle(x, y, 30, "white");
    //Vale.Text("Test", 10, 10);
    x += dx; 
    y += dy; 

    if (x >= Vale.Width - 15 || x <= 0 + 15)
    {
        dx *= -1;
    }
    if (y >= Vale.Height - 15 || y <= 0 + 15)
    {
        dy *= -1;
    }
}

MouseClicked = (event) => console.log(event);

main = () => {
    draw();
} 