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
    const firstNumber = input[i];

    for (let j = i + 1; j < input.length; j++) {
      const secondNumber = input[j];

      for (let k = j + 1; k < input.length; k++) {
        const thirdNumber = input[k];

        if (firstNumber + secondNumber + thirdNumber === checkValue) {
          return firstNumber * secondNumber * thirdNumber;
        }
      }
    }
  }
}
