fs = require("fs");

fs.readFile("./input.txt", "utf8", function (err, inputData) {
  if (err) {
    return console.log(err);
  }

  const input = inputData
    .trim()
    .split("\n")
    .map(($) => parseInt($));
  console.log(part1(input));
  console.log(part2(input));
});

function part1(input) {
  const sortedInput = input.sort((a, z) => a - z);
  const inputIncludingEndpoints = [
    0,
    ...sortedInput,
    sortedInput[sortedInput.length - 1] + 3,
  ];

  const joltageDifferences = inputIncludingEndpoints.reduce(
    (acc, curr, index, arr) => {
      if (index === 0) return acc;

      const previous = arr[index - 1];
      acc[curr - previous] += 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0 }
  );

  return joltageDifferences[1] * joltageDifferences[3];
}

function part2(input) {
  const sortedInput = [0, ...input.sort((a, z) => a - z)];
  const cache = {};

  const getPermutationsForIndex = (currentIndex) => {
    if (currentIndex === sortedInput.length - 1) {
      return 1;
    }

    if (currentIndex < 0) {
      return 0;
    }

    if (cache[currentIndex]) {
      return cache[currentIndex];
    }

    const currentNumber = sortedInput[currentIndex];
    let numPermutations = 0;

    for (jump of [1, 2, 3]) {
      numPermutations += getPermutationsForIndex(
        sortedInput.indexOf(currentNumber + jump)
      );
    }

    cache[currentIndex] = numPermutations;
    return numPermutations;
  };

  return getPermutationsForIndex(0);
}
