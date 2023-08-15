let canvas = document.getElementById('canvas');
canvas.width = 1200
canvas.height = 846.6
context = canvas.getContext('2d');
var canvasRectangle = canvas.getBoundingClientRect();

function drawLine(x1, y1, x2, y2, line){
        context.beginPath();
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
                context.strokeStyle = '#84cdbc';
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
   //Should return a list of pairs of coordinates and line

    for (i = 0; i < obj.length; i++) {
        drawLine(obj[i][0], obj[i][1], obj[i][2], obj[i][3], obj[i][4]);
    }

}
//Start of potential challenge route
//sendDrawRequest("CHESHAM", "CHALFONT & LATIMER")
//sendDrawRequest("CHALFONT & LATIMER", "AMERSHAM")
//sendDrawRequest("AMERSHAM", "NORTH HARROW")
//sendDrawRequest("RAYNERS LANE", "NORTH EALING")
//sendDrawRequest("WEST ACTON", "WHITE CITY")
//sendDrawRequest("WHITE CITY", "WEST RUISLIP")
//sendDrawRequest("UXBRIDGE", "PRESTON ROAD")
//sendDrawRequest("HARROW & WEALDSTONE", "ELEPHANT & CASTLE")
//sendDrawRequest("ELEPHANT & CASTLE", "LONDON BRIDGE")
//sendDrawRequest("SOUTHWARK", "WEST HAM")
//sendDrawRequest("WEST HAM", "UPMINSTER")
//sendDrawRequest("UPMINSTER", "ALDGATE EAST")
//sendDrawRequest("ALDGATE", "SLOANE SQUARE")
//sendDrawRequest("VICTORIA", "BRIXTON")
//sendDrawRequest("STOCKWELL", "KENNNINGTON")
//sendDrawRequest("KENNINGTON", "BATTERSEA POWER STATION")
//sendDrawRequest("KENNINGTON", "MORDEN")
//sendDrawRequest("WIMBLEDON", "EDGWARE ROAD")
//sendDrawRequest("EDGWARE ROAD", "HAMMERSMITH")
//sendDrawRequest("HAMMERSMITH", "COCKFOSTERS")


//Check all stations
//sendDrawRequest("EDGWARE", "MORDEN")
//sendDrawRequest("HIGH BARNET", "BATTERSEA POWER STATION")
//sendDrawRequest("MILL HILL EAST", "MORDEN")
//
//sendDrawRequest("CHESHAM", "ALDGATE")
//sendDrawRequest("AMERSHAM", "WATFORD")
//sendDrawRequest("UXBRIDGE", "HARROW-ON-THE-HILL")
//
//sendDrawRequest("RAYNERS LANE", "COCKFOSTERS")
//sendDrawRequest("HEATHROW TERMINAL FOUR", "ACTON TOWN")
//sendDrawRequest("HEATHROW TERMINAL FOUR", "HEATHROW TERMINAL FIVE")
//
//sendDrawRequest("EALING BROADWAY", "TOWER HILL")
//sendDrawRequest("ALDGATE EAST", "UPMINSTER")
//sendDrawRequest("WIMBLEDON", "KENSINGTON (OLYMPIA)")
//sendDrawRequest("RICHMOND", "TURNHAM GREEN")
//
//sendDrawRequest("WEST RUISLIP", "EPPING")
//sendDrawRequest("EALING BROADWAY", "HAINAULT")
//sendDrawRequest("WOODFORD", "GRANGE HILL")
//
//sendDrawRequest("HARROW & WEALDSTONE", "ELEPHANT & CASTLE")
//
//sendDrawRequest("STANMORE", "STRATFORD")
//
//sendDrawRequest("WATERLOO", "BANK")
//
//sendDrawRequest("HAMMERSMITH", "LIVERPOOL STREET")
//sendDrawRequest("BAYSWATER", "GLOUCESTER ROAD")
//
//sendDrawRequest("WALTHAMSTOW", "BRIXTON")




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
DRAWING = true;
previousStation = null;

const sendCoordinates = async (x, y) => {
   const url = '/sendCoordinates'; // the URL to send the HTTP request to
   const body = JSON.stringify({"x" : x, "y" : y }) // whatever you want to send in the body of the HTTP request
   const headers = {'Content-Type': 'application/json'}; // if you're sending JSON to the server
   const method = 'POST';
   const response = await fetch(url, { method, body, headers });
   const data = await response.text(); // or response.json() if your server returns JSON
   console.log(data);
   if (data == "nothing"){
   } else {
       const obj = JSON.parse(data);
        DRAWING = !DRAWING;
        if (DRAWING){
        nextStation = obj["name"];
        sendDrawRequest(previousStation, nextStation);
        console.log(previousStation, nextStation);
        }
        previousStation = obj["name"];
   }
}
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

    sendCoordinates(x, y);
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
