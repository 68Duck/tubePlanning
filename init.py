import time

from db_generator import DB_generator
from flask import g,Flask,render_template,request,make_response
from os import path
import sqlite3


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



@app.route("/requestStation", methods=["POST"])
def requestNextStation():
    time.sleep(0.2)
    dbGenerator = DB_generator("distances.db", "distances.csv", get_db())
    return dbGenerator.requestNextStation()


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

