fs = require("fs");

fs.readFile("./input.txt", "utf8", function (err, inputData) {
  if (err) {
    return console.log(err);
  }

  console.log(part1(inputData.trim().split("\n\n")));
  console.log(part2(inputData.trim().split("\n\n")));
});

function part1(input) {
  return input
    .map((answer) => new Set(answer.replace(/\n/g, "").split("")))
    .reduce((acc, curr) => acc + curr.size, 0);
}

function part2(input) {
  return input.reduce((acc, answer) => {
    individuals = answer.split("\n");
    let numYes = 0;
    for (let char of individuals[0]) {
      if (answer.match(new RegExp(char, "g")).length === individuals.length)
        numYes++;
    }

    return acc + numYes;
  }, 0);
}
