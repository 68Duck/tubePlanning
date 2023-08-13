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
        context.moveTo(x1, y1 - 100);
        context.lineTo(x2, y2 - 100);
        switch (line) {
            case "Metropolitan":
                context.strokeStyle = '#97015e';
                break;
            case "District":
                context.strokeStyle = '#00843d';
                break;
            case "Central ":
                context.strokeStyle = '#ee2e22';
                break;
            case "Piccadilly ":
                context.strokeStyle = '#1b3f94';
                break;
            case "Bakerloo ":
                context.strokeStyle = '#b05f0f';
                break;
            case "Circle ":
                context.strokeStyle = '#fed105';
                break;
            case "H & C":
                context.strokeStyle = '#f386a0';
                break;
            case "Jubilee ":
                context.strokeStyle = '#959ca1';
                break;
            case "Northern ":
                context.strokeStyle = '#231f20';
                break;
            case "Waterloo & City":
                context.strokeStyle = '#cae9e2';
                break;
            case "Victoria":
                context.strokeStyle = '#069ddc';
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

sendDrawRequest("UPMINSTER", "ALDGATE EAST")
sendDrawRequest("AMERSHAM", "ALDGATE")
sendDrawRequest("EPPING", "WEST RUISLIP")
sendDrawRequest("WALTHAMSTOW", "BRIXTON")
sendDrawRequest("KENTON", "MARYLEBONE")
sendDrawRequest("HATTON CROSS", "COCKFOSTERS")
sendDrawRequest("GOLDHAWK ROAD", "ROYAL OAK")
sendDrawRequest("MORDEN", "ANGEL")
sendDrawRequest("ALDGATE", "SOUTH KENSINGTON")
sendDrawRequest("BANK", "WATERLOO")
sendDrawRequest("SOUTHWARK", "STRATFORD")

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
