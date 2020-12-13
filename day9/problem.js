const { join } = require("path");

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
  const preambleContainsSum = (preamble, match) => {
    const hash = preamble.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {});

    for (preambleValue of preamble) {
      if (hash[match - preambleValue]) {
        return true;
      }
    }
  };

  const preambleLength = 25;

  for (let i = 25; i < input.length; i++) {
    const inputValue = input[i];
    const preamble = input.slice(i - preambleLength, i + 1);

    if (!preambleContainsSum(preamble, inputValue)) {
      return inputValue;
    }
  }
}

function part2(input) {
  const invalidNumber = part1(input);

  let left = 0;
  let right = 0;
  let sum = 0;

  while (sum !== invalidNumber) {
    if (sum < invalidNumber) {
      right++;
      sum += input[right];
    } else if (sum > invalidNumber) {
      left++;
      right = left;
      sum = 0;
    }
  }

  const requiredRange = input.slice(left, right + 1);
  const sortedRequiredRange = requiredRange.sort();

  return (
    sortedRequiredRange[0] + sortedRequiredRange[sortedRequiredRange.length - 1]
  );
}
