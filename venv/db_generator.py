import sqlite3
from os import path
import csv
from dict_factory import dict_factory
from flask import g

fileDir = path.dirname(__file__)

COLUMNS = ["Line", "Direction", "Origin Station", "Destination Station", "Distance (km)", "Duration (mins)"]
SQL_HEADERS = ["id", "line", "direction", "origin", "destination", "distance", "duration"]

class DB_generator(object):
    def __init__(self, dbName, csvName, db):
        self.dbName = dbName
        self.csvName = csvName
        self.db = db

    def queryDb(self, query, args=(), one=False):
        cur = self.db.execute(query, args)
        cur.row_factory = dict_factory
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv



    # def addNextStation(self, x, y):
    #     addedStations = self.queryDb("SELECT name FROM stations ORDER BY name")
    #     addedStations = list(map(lambda x: x["name"], addedStations))
    #     stations = self.queryDb("SELECT DISTINCT origin FROM distances ORDER BY origin")
    #     stations = list(map(lambda x: x["origin"], stations))
    #     for station in stations:
    #         if station not in addedStations:
    #             print(station)
    #             record = [None, station, x, y]
    #             self.insertIntoTable("stations", record)
    #             self.queryDb("COMMIT")
    #             return station
    #
    # def requestNextStation(self):
    #     addedStations = self.queryDb("SELECT name FROM stations ORDER BY name")
    #     addedStations = list(map(lambda x: x["name"], addedStations))
    #     stations = self.queryDb("SELECT DISTINCT origin FROM distances ORDER BY origin")
    #     stations = list(map(lambda x: x["origin"], stations))
    #     for station in stations:
    #         if station not in addedStations:
    #             print(station)
    #             return station




    def insertIntoTable(self, table_name, record_values):
        question_marks = ""
        for i in range(len(record_values)):
            question_marks = question_marks + "?,"
        question_marks = question_marks[0:len(question_marks)-1]
        query = "INSERT INTO {0} VALUES ({1})".format(table_name,question_marks)
        print(query)
        self.queryDb(query,record_values)

    def readCsv(self):
        with open(self.csvName) as csvfile:
            reader = csv.reader(csvfile)
            counter = 0
            for row in reader:
                row.insert(0, counter);
                counter += 1
                self.insertIntoTable("distances", row)
                print(row)
            self.queryDb("COMMIT")


