from Station import Station
import operator

CHANGETRAINPENALTY = 100000

class Solver(object):
    def __init__(self, db):
        self.db = db

    def getAllStations(self):
        stations = self.db.queryDb("SELECT DISTINCT origin FROM distances ORDER BY origin")
        return list(map(lambda x: x["origin"], stations))

    def getStationCoordinates(self, stationName):
        coordinates = self.db.queryDb("SELECT x,y FROM stations WHERE name = ?", (stationName, ), one = True)
        return coordinates


    def getNeighboringStations(self, station, parentStation):
        neighbours = []
        links = self.db.searchByOrigin(station.getName())
        for link in links:
            changeTrainPenalty = 0
            if station.getLine() != link["line"]:
                changeTrainPenalty += CHANGETRAINPENALTY
            newStation = Station(link["destination"],
                        station.getTimeFromStart() + link["duration"]
                                 + changeTrainPenalty,
                        link["line"], parentStation)
            # if newStation not in neighbours:
            neighbours.append(newStation)
        return neighbours

    def findPath(self, origin, destination):
        originStation = Station(origin, 0)
        destinationStation = Station(destination, 999999999)
        queue = [originStation]
        visited = []
        while len(queue) > 0:
            queue.sort(key=operator.attrgetter('timeFromStart'))
            # print(list(map(lambda x: x.getTimeFromStart(), queue)))
            # if destinationStation in queue:
            #     for station in queue:
            #         if station == destinationStation:
            #             return station

            currentStation = queue.pop(0)
            if currentStation == destinationStation:
                return currentStation
            visited.append(currentStation)
            # print(currentStation.stationName)
            neighbours = self.getNeighboringStations(currentStation, currentStation)
            # print(list(map(lambda x: x.getName(), neighbours)))
            for neighbour in neighbours:
                if neighbour in visited:
                    minTime = neighbour.getTimeFromStart()
                    for v in visited:
                        if v == neighbour:
                            minTime = min(minTime, v.getTimeFromStart())
                    # print(minTime, "Min time 2")
                    if neighbour.getTimeFromStart() == minTime:
                        queue.append(neighbour)
                if neighbour not in visited:
                    queue.append(neighbour)
                # print(neighbour.stationName)

