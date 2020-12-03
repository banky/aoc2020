fs = require('fs');

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const inputData = data
    .trim()
    .split('\n')
    .map((input) => {
      return {
        min: parseInt(input.split('-')[0]),
        max: parseInt(input.split(' ')[0].split('-')[1]),
        letter: input[input.indexOf(':') - 1],
        password: input.split(':')[1].trim(),
      };
    });

  console.log(solution(inputData));
});

function solution(input) {
  let validPasswords = [];

  input.forEach((row) => {
    let count = 0;

    for (letter of row.password) {
      if (letter === row.letter) {
        count++;
      }
    }

    if (count >= row.min && count <= row.max) {
      validPasswords.push(row);
    }
  });

  return validPasswords.length;
}
