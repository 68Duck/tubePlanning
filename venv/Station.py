

class Station(object):
    def __init__(self, stationName, timeFromStart, line = None, parentStation = None):
        self.stationName = stationName
        self.visited = False
        self.timeFromStart = timeFromStart
        self.parentStation = parentStation
        self.line = line

    def getParentStation(self):
        return self.parentStation

    def setVisited(self, visited = True):
        self.visited = visited

    def getName(self):
        return self.stationName

    def getLine(self):
        return self.line

    def getTimeFromStart(self):
        return self.timeFromStart

    def isVisited(self):
        return self.visited

    def __eq__(self, other):
        if (other != None):
            if self.__class__ == other.__class__:
                return self.stationName == other.stationName
        return False