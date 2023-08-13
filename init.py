from db_generator import DB_generator
from flask import g,Flask,render_template,request,make_response
from os import path
import sqlite3


fileDir = path.dirname(__file__)

app = Flask(__name__)
app.secret_key = "b6jF"




if __name__ == "__main__":
    dbGenerator = DB_generator("distances.db", "distances.csv")



    dbGenerator.addNextStation()