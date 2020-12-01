fs = require('fs');

fs.readFile('./p1.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const inputData = data.split('\n').map((num) => parseInt(num, 10));

  console.log(naiveSolution(inputData, 2020));
});

function naiveSolution(input, checkValue) {
  for (let i = 0; i < input.length; i++) {
    const leftNum = input[i];

    for (let j = i + 1; j < input.length; j++) {
      const rightNum = input[j];

      if (checkValue - leftNum === rightNum) {
        return leftNum * rightNum;
      }
    }
  }
}
