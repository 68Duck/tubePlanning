import time

from db_generator import DB_generator
from flask import g,Flask,render_template,request,make_response
from os import path
import sqlite3
from Solver import Solver
from db import DB


fileDir = path.dirname(__file__)

app = Flask(__name__)
app.secret_key = "b6jF"

DATABASE = "distances.db"

@app.teardown_appcontext  #closes the database when the file is closed
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(path.join(fileDir, DATABASE))
    return db


@app.route("/drawRequest", methods = ["POST"])
def drawRequest():
    data = request.get_json()
    if data is None:
        pass
    else:
        origin = data["origin"]
        destination = data["destination"]
        solver = Solver(DB("distances.db", get_db()))
        station = solver.findPath(origin, destination)
        route = []
        while station.parentStation is not None:
            route.append(station)
            station = station.parentStation
        route.append(station)

        print(list(map(lambda x: x.getName(), route)))

        points = list(map(lambda x: [solver.getStationCoordinates(x.getName())["x"],
                                   solver.getStationCoordinates(x.getName())["y"],
                                   x.getLine()], route))

        lines = []
        # print(points)
        for i in range(len(points) - 1):
            # print(i)
            # print(points[i])
            # print(points[i][0])
            # print(points[i][1])
            # print(points[i+1][0])
            # print(points[i+1][1])
            # print(points[i][2])
            lines.append([points[i][0], points[i][1],
                         points[i+1][0], points[i+1][1], points[i][2]])

        return lines

    return "nothing"

# @app.route("/requestStation", methods=["POST"])
# def requestNextStation():
#     time.sleep(0.2)
#     dbGenerator = DB_generator("distances.db", "distances.csv", get_db())
#     return dbGenerator.requestNextStation()


# @app.route("/sendCoordinates", methods = ["POST"])
# def sendCoordinates():
#     data = request.get_json()
#     if data is None:
#         pass
#     else:
#         dbGenerator = DB_generator("distances.db", "distances.csv", get_db())
#         dbGenerator.addNextStation(data["x"], data["y"])
#     return "nothing"

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":

    app.run()

