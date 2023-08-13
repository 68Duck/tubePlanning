



const requestStation = async () => {
   const url = '/requestStation'; // the URL to send the HTTP request to
   const body = JSON.stringify("") // whatever you want to send in the body of the HTTP request
   const headers = {'Content-Type': 'application/json'}; // if you're sending JSON to the server
   const method = 'POST';
   const response = await fetch(url, { method, body, headers });
   const data = await response.text(); // or response.json() if your server returns JSON
   console.log(data);
}

const sendCoordinates = async (x, y) => {
   const url = '/sendCoordinates'; // the URL to send the HTTP request to
   const body = JSON.stringify({"x" : x, "y" : y }) // whatever you want to send in the body of the HTTP request
   const headers = {'Content-Type': 'application/json'}; // if you're sending JSON to the server
   const method = 'POST';
   const response = await fetch(url, { method, body, headers });
   const data = await response.text(); // or response.json() if your server returns JSON
   console.log(data);
}

requestStation();

let canvas = document.getElementById('canvas');
canvas.width = 1200
canvas.height = 846.6
context = canvas.getContext('2d');
var canvasRectangle = canvas.getBoundingClientRect();

canvas.onclick = function(e) {
    var x = e.x - canvasRectangle.left;
    var y = e.y - canvasRectangle.top;
    sendCoordinates(x, y);
    requestStation();
}

//DRAWING = true;
//previousX = null
//previousY = null
//
//let canvas = document.getElementById('canvas');
//canvas.width = 1200
//canvas.height = 846.6
//context = canvas.getContext('2d');
//var canvasRectangle = canvas.getBoundingClientRect();
//
//
//canvas.onclick = function(e) {
//    var x = e.x - canvasRectangle.left;
//    var y = e.y - canvasRectangle.top;
//    previousPoint = (x, y);
//    console.log(x, y);
//    DRAWING = ! DRAWING
//    console.log(DRAWING)
//    if (DRAWING) {
//        context.beginPath();
//        console.log(previousX, previousY, x, y)
//        context.moveTo(previousX, previousY);
//        context.lineTo(x, y);
//        context.strokeStyle = '#97015e'
//        context.lineWidth = 4;
//        context.stroke();
//    }
//    previousX = x;
//    previousY = y;
//}
