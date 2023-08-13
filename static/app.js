let canvas = document.getElementById('canvas');
canvas.width = 1200
canvas.height = 846.6
context = canvas.getContext('2d');
var canvasRectangle = canvas.getBoundingClientRect();

function drawLine(x1, y1, x2, y2, line){
        console.log("Drawing line")
        console.log(x1, y1, x2, y2, line)
        context.beginPath();
//        console.log(x1, y1, x2, y2)
        context.moveTo(x1 - canvasRectangle.left, y1 - canvasRectangle.top - 100);
        context.lineTo(x2 - canvasRectangle.left, y2 - canvasRectangle.top -100);
        switch (line) {
            case "Metropolitan":
                context.strokeStyle = '#97015e';
                break;
        }
        context.lineWidth = 4;
        context.stroke();
}

const sendDrawRequest = async (origin, destination) => {
   const url = '/drawRequest'; // the URL to send the HTTP request to
   const body = JSON.stringify({"origin" : origin, "destination" : destination }) // whatever you want to send in the body of the HTTP request
   const headers = {'Content-Type': 'application/json'}; // if you're sending JSON to the server
   const method = 'POST';
   const response = await fetch(url, { method, body, headers });
   const data = await response.text(); // or response.json() if your server returns JSON
   const obj = JSON.parse(data);
   console.log(obj);
   //Should return a list of pairs of coordinates and line

    for (i = 0; i < obj.length; i++) {
        console.log(obj[i])
        drawLine(obj[i][0], obj[i][1], obj[i][2], obj[i][3], obj[i][4]);
    }

}

sendDrawRequest("UPMINSTER", "UPNEY")
sendDrawRequest("AMERSHAM", "ALDGATE")

//const requestStation = async () => {
//   const url = '/requestStation'; // the URL to send the HTTP request to
//   const body = JSON.stringify("") // whatever you want to send in the body of the HTTP request
//   const headers = {'Content-Type': 'application/json'}; // if you're sending JSON to the server
//   const method = 'POST';
//   const response = await fetch(url, { method, body, headers });
//   const data = await response.text(); // or response.json() if your server returns JSON
//   console.log(data);
//}
//
//const sendCoordinates = async (x, y) => {
//   const url = '/sendCoordinates'; // the URL to send the HTTP request to
//   const body = JSON.stringify({"x" : x, "y" : y }) // whatever you want to send in the body of the HTTP request
//   const headers = {'Content-Type': 'application/json'}; // if you're sending JSON to the server
//   const method = 'POST';
//   const response = await fetch(url, { method, body, headers });
//   const data = await response.text(); // or response.json() if your server returns JSON
//   console.log(data);
//}
//
//requestStation();
//
//let canvas = document.getElementById('canvas');
//canvas.width = 1200
//canvas.height = 846.6
//context = canvas.getContext('2d');
//var canvasRectangle = canvas.getBoundingClientRect();
//
canvas.onclick = function(e) {
    var x = e.x - canvasRectangle.left;
    var y = e.y - canvasRectangle.top;
    console.log(x, y);
//    sendCoordinates(x, y);
//    requestStation();
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
