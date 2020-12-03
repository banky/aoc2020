fs = require('fs');

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const inputData = data.trim().split('\n');

  console.log(solution(inputData));
});

function solution(input) {
  const width = input[0].length;
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];
  let allTreesHit = [];

  slopes.forEach((slope) => {
    let treesHit = 0;
    let x = 0;

    for (let y = 0; y < input.length; y += slope.down) {
      const row = input[y];
      if (row[x] === '#') {
        treesHit++;
      }

      x = (x + slope.right) % width;
    }

    allTreesHit.push(treesHit);
  });

  return allTreesHit.reduce((curr, acc) => curr * acc, 1);
}
