fs = require('fs');
const { performance } = require('perf_hooks');

fs.readFile('./p1.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const inputData = data.split('\n').map((num) => parseInt(num, 10));

  var t0 = performance.now();
  console.log(naive(inputData, 2020));
  var t1 = performance.now();
  console.log('Call to naive took ' + (t1 - t0) + ' milliseconds.'); // 7.98 milliseconds.

  t0 = performance.now();
  console.log(binarySearch(inputData, 2020));
  t1 = performance.now();
  console.log('Call to binarySearch took ' + (t1 - t0) + ' milliseconds.'); // 1.71 milliseconds.
});

/**
 * Time: O(n^2)
 */
function naive(input, checkValue) {
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

/**
 * Time: O(n log(n))
 */
function binarySearch(input, checkValue) {
  // V8 does O(n log(n)) sort
  input.sort((a, z) => a - z);

  for (let i = 0; i < input.length; i++) {
    const firstNumber = input[i];

    let bottomBound = i + 1;
    let topBound = input.length - 1;

    while (topBound - bottomBound > 1) {
      const secondNumberIndex = Math.floor((topBound + bottomBound) / 2);
      const secondNumber = input[secondNumberIndex];

      if (firstNumber + secondNumber + secondNumber === checkValue) {
        return firstNumber * secondNumber * secondNumber;
      } else if (firstNumber + secondNumber + secondNumber < checkValue) {
        bottomBound = secondNumberIndex + 1;
      } else {
        topBound = secondNumberIndex - 1;
      }
    }
  }
}
