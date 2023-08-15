import sqlite3
from os import path
from dict_factory import dict_factory

fileDir = path.dirname(__file__)

class DB(object):
    def __init__(self, dbName, db):
        self.dbName = dbName
        self.db = db

    def queryDb(self, query, args=(), one=False):
        cur = self.db.execute(query, args)
        cur.row_factory = dict_factory
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv

    def searchByOrigin(self, origin):
        return self.queryDb("SELECT * FROM distances WHERE origin = ? COLLATE NOCASE", (origin, ))

    def searchForStation(self, x, y):
        return self.queryDb("SELECT name FROM stations WHERE x < ? AND x > ? AND y < ? AND y > ?",
                            (x + 4, x - 4, y + 104, y + 96), one = True)
