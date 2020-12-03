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
  let x = 0;
  let treesHit = 0;

  input.forEach((row) => {
    if (row[x] === '#') {
      treesHit++;
    }

    x = (x + 3) % width;
  });

  return treesHit;
}
