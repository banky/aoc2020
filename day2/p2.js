fs = require('fs');
const { performance } = require('perf_hooks');

fs.readFile('./input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const inputData = data
    .trim()
    .split('\n')
    .map((input) => {
      return {
        pos1: parseInt(input.split('-')[0]),
        pos2: parseInt(input.split(' ')[0].split('-')[1]),
        letter: input[input.indexOf(':') - 1],
        password: input.split(':')[1].trim(),
      };
    });

  console.log(solution(inputData));
});

function solution(input) {
  let validPasswords = [];

  input.forEach((row) => {
    const firstLetter = row.password[row.pos1 - 1];
    const secondLetter = row.password[row.pos2 - 1];

    if (
      (firstLetter === row.letter && secondLetter !== row.letter) ||
      (firstLetter !== row.letter && secondLetter === row.letter)
    ) {
      validPasswords.push(row);
    }
  });

  return validPasswords.length;
}
