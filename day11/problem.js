fs = require("fs");

fs.readFile("./input.txt", "utf8", function (err, inputData) {
  if (err) {
    return console.log(err);
  }

  console.log(part1(inputData));
  console.log(part2(inputData));
});

const getUpdatedSeat = (seat, numOccupiedNeighbours, occupationThreshold) => {
  switch (seat) {
    case "L":
      return numOccupiedNeighbours === 0 ? "#" : "L";
    case "#":
      return numOccupiedNeighbours >= occupationThreshold ? "L" : "#";
    case ".":
    default:
      return seat;
  }
};

const seatMapToString = (seatMap) => seatMap.map(($) => $.join("")).join("\n");

const areSeatMapsEqual = (oldMap, newMap) =>
  seatMapToString(oldMap) === seatMapToString(newMap);

function part1(input) {
  let currentSeats = input.split("\n").map(($) => $.split(""));
  let oldSeats = [];

  do {
    oldSeats = currentSeats;
    currentSeats = oldSeats.map(($) => [...$]);

    for (let seatRow = 0; seatRow < oldSeats.length; seatRow++) {
      for (let seatCol = 0; seatCol < oldSeats[seatRow].length; seatCol++) {
        let numOccupiedNeighbours = 0;

        for (let row of [-1, 0, 1]) {
          for (let col of [-1, 0, 1]) {
            if (row === 0 && col === 0) continue;

            const checkSeat = oldSeats[seatRow + row]?.[seatCol + col];
            if (checkSeat === "#") numOccupiedNeighbours++;
          }
        }

        currentSeats[seatRow][seatCol] = getUpdatedSeat(
          oldSeats[seatRow][seatCol],
          numOccupiedNeighbours,
          4
        );
      }
    }
  } while (!areSeatMapsEqual(oldSeats, currentSeats));

  return (seatMapToString(currentSeats).match(/#/g) || []).length;
}

function part2(input) {
  let currentSeats = input.split("\n").map(($) => $.split(""));
  let oldSeats = [];

  do {
    oldSeats = currentSeats;
    currentSeats = oldSeats.map(($) => [...$]);

    for (let seatRow = 0; seatRow < oldSeats.length; seatRow++) {
      for (let seatCol = 0; seatCol < oldSeats[seatRow].length; seatCol++) {
        let numOccupiedNeighbours = 0;

        // Vertical and horizontal directions
        const directions = [
          { v: -1, h: -1 },
          { v: -1, h: 0 },
          { v: -1, h: 1 },
          { v: 0, h: 1 },
          { v: 1, h: 1 },
          { v: 1, h: 0 },
          { v: 1, h: -1 },
          { v: 0, h: -1 },
        ];

        for (const direction of directions) {
          for (let step = 1; ; step++) {
            const row = direction.v * step;
            const col = direction.h * step;
            const checkSeat = oldSeats[seatRow + row]?.[seatCol + col];

            if (checkSeat === ".") {
              continue;
            }

            if (checkSeat === "#") {
              numOccupiedNeighbours++;
            }

            break;
          }
        }

        currentSeats[seatRow][seatCol] = getUpdatedSeat(
          oldSeats[seatRow][seatCol],
          numOccupiedNeighbours,
          5
        );
      }
    }
  } while (!areSeatMapsEqual(oldSeats, currentSeats));

  return (seatMapToString(currentSeats).match(/#/g) || []).length;
}
