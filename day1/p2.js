fs = require('fs');
const { performance } = require('perf_hooks');

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const inputData = data.split('\n').map((num) => parseInt(num, 10));

  var t0 = performance.now();
  console.log(naive(inputData, 2020));
  var t1 = performance.now();
  console.log('Call to naive took ' + (t1 - t0) + ' milliseconds.'); // 14.49 milliseconds.

  t0 = performance.now();
  console.log(binarySearch(inputData, 2020));
  t1 = performance.now();
  console.log('Call to binarySearch took ' + (t1 - t0) + ' milliseconds.'); // 0.36 milliseconds.

  t0 = performance.now();
  console.log(bestICouldThinkOf(inputData, 2020));
  t1 = performance.now();
  console.log('Call to bestICouldThinkOf took ' + (t1 - t0) + ' milliseconds.'); // 0.15 milliseconds.
});

/**
 * Time: O(n^3)
 */
function naive(input, checkValue) {
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

/**
 * Time: O(n^2 log(n))
 */
function binarySearch(input, checkValue) {
  // V8 does O(n log(n)) sort
  input.sort((a, z) => a - z);

  for (let i = 0; i < input.length; i++) {
    const firstNumber = input[i];

    for (let j = i + 1; j < input.length; j++) {
      const secondNumber = input[j];
      let bottomBound = j + 1;
      let topBound = input.length - 1;

      while (topBound - bottomBound > 1) {
        const thirdNumberIndex = Math.floor((topBound + bottomBound) / 2);
        const thirdNumber = input[thirdNumberIndex];

        if (firstNumber + secondNumber + thirdNumber === checkValue) {
          return firstNumber * secondNumber * thirdNumber;
        } else if (firstNumber + secondNumber + thirdNumber < checkValue) {
          bottomBound = thirdNumberIndex + 1;
        } else {
          topBound = thirdNumberIndex - 1;
        }
      }
    }
  }
}

/**
 * Time: O(n^2)
 */
function bestICouldThinkOf(input, checkValue) {
  // V8 does O(n log(n)) sort
  input.sort((a, z) => a - z);

  for (let i = 0; i < input.length; i++) {
    let left = i + 1;
    let right = input.length - 1;

    while (left < right) {
      const sum = input[i] + input[left] + input[right];
      if (sum === checkValue) {
        return input[i] * input[left] * input[right];
      } else if (sum < checkValue) {
        left++;
      } else {
        right--;
      }
    }
  }
}
