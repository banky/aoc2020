fs = require("fs");

fs.readFile("./input.txt", "utf8", function (err, inputData) {
  if (err) {
    return console.log(err);
  }

  console.log(solution(inputData.trim().split("\n")));
});

function solution(input) {
  const decodeId = (value, low, high) => {
    const lowRegex = new RegExp(low, "g");
    const highRegex = new RegExp(high, "g");

    const binaryRepresentation = value
      .replace(lowRegex, "0")
      .replace(highRegex, "1");
    return parseInt(binaryRepresentation, 2);
  };

  const boardingPasses = input.map((boardingPass) => {
    const row = decodeId(boardingPass.substring(0, 7), "F", "B");
    const column = decodeId(boardingPass.substring(7), "L", "R");
    const seatId = row * 8 + column;

    return { row, column, seatId };
  });

  const sortedBoardingPasses = boardingPasses.sort(
    (a, z) => a.seatId - z.seatId
  );

  const highestSeatId =
    sortedBoardingPasses[sortedBoardingPasses.length - 1].seatId;

  let seatId;
  for (let i = 0; i < sortedBoardingPasses.length; i++) {
    if (
      sortedBoardingPasses[i].seatId + 1 !==
      sortedBoardingPasses[i + 1].seatId
    ) {
      seatId = sortedBoardingPasses[i].seatId + 1;
      break;
    }
  }

  return { highestSeatId, seatId };
}
