

DRAWING = true;
previousX = null
previousY = null

let canvas = document.getElementById('canvas');
canvas.width = 1200
canvas.height = 846.6
context = canvas.getContext('2d');
var canvasRectangle = canvas.getBoundingClientRect();


canvas.onclick = function(e) {
    var x = e.x - canvasRectangle.left;
    var y = e.y - canvasRectangle.top;

    previousPoint = (x, y);
    console.log(x, y);
    DRAWING = ! DRAWING
    console.log(DRAWING)
    if (DRAWING) {
        context.beginPath();
        console.log(previousX, previousY, x, y)
        context.moveTo(previousX, previousY);
        context.lineTo(x, y);
        context.strokeStyle = '#97015e'
        context.lineWidth = 4;
        context.stroke();
    }

    previousX = x;
    previousY = y;


}

//document.onmousemove = function(e)
//{
//    var x = e.pageX;
//    var y = e.pageY;
//
//    console.log(x, y);
//    // do what you want with x and y
//};