
from db import DB
from Solver import Solver
from db_generator import DB_generator
# dbGenerator = DB_generator("distances.db", "distances.csv")


if __name__ == '__main__':
    # origin = input("Enter origin station:")
    # destination = input("Enter destination station:")
    dbGenerator = DB_generator("distances.db", "distances.csv")
    dbGenerator.addNextStation()


def main():
    db = DB("distances.db")

    solver = Solver(db)
    allStations = solver.getAllStations()
    lineRoutes = []

    for s1 in allStations:
        for s2 in allStations:
            print(s1, s2)
            station = solver.findPath(s1, s2)
            if station is None:
                print("test")
                continue
            route = []
            while station.parentStation is not None:
                route.append(station)
                station = station.parentStation
            lines = []
            for line in list(map(lambda x: x.getLine(), route)):
                if len(lines) == 0:
                    lines.append(line)
                if line != lines[-1]:
                    lines.append(line)
            lineRoutes.append(lines)
            print(lines)

    print(lineRoutes)



    # station = solver.findPath("UPMINSTER", "AMERSHAM")
    # route = []
    # while station.parentStation is not None:
    #     route.append(station)
    #     station = station.parentStation
    # print(list(map(lambda x: x.getName(), route)))
    # print(list(map(lambda x: x.getLine(), route)))
    # lines = []
    # for line in list(map(lambda x: x.getLine(), route)):
    #     if len(lines) == 0:
    #         lines.append(line)
    #     if line != lines[-1]:
    #         lines.append(line)
    # print(lines)
    # # print(db.searchByOrigin(origin))


