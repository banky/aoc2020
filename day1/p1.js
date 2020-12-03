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
  console.log('Call to naive took ' + (t1 - t0) + ' milliseconds.'); // 7.98 milliseconds.
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
