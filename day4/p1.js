fs = require("fs");

fs.readFile("./input.txt", "utf8", function (err, inputData) {
  if (err) {
    return console.log(err);
  }

  console.log(solution(inputData));
});

function solution(input) {
  const credentialsToObject = (credential) => {
    return credential.split(/[ \n]/g).reduce((acc, curr) => {
      const key = curr.substring(0, 3);
      const value = curr.substring(4);

      acc[key] = value;
      return acc;
    }, {});
  };

  const rawCredentials = input.split("\n\n");
  const credentials = rawCredentials.map(credentialsToObject);

  const numValidCredentialsPart1 = credentials.reduce(
    part1CredentialValidator,
    0
  );
  const numValidCredentialsPart2 = credentials.reduce(
    part2CredentialValidator,
    0
  );

  return [numValidCredentialsPart1, numValidCredentialsPart2];
}

function part1CredentialValidator(acc, curr) {
  const hasValidFields =
    curr.byr &&
    curr.iyr &&
    curr.eyr &&
    curr.hgt &&
    curr.hcl &&
    curr.ecl &&
    curr.pid;

  return hasValidFields ? acc + 1 : acc;
}

function part2CredentialValidator(acc, { byr, iyr, eyr, hgt, hcl, ecl, pid }) {
  const validByr = parseInt(byr) >= 1920 && parseInt(byr) <= 2002;
  const validIyr = parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020;
  const validEyr = parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030;
  const validHgt =
    (/[0-9]+in/.test(hgt) && parseInt(hgt) >= 59 && parseInt(hgt) <= 76) ||
    (/[0-9]+cm/.test(hgt) && parseInt(hgt) >= 150 && parseInt(hgt) <= 193);
  const validHcl = /#[0-9a-f]+/.test(hcl);
  const validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
    ecl
  );
  const validPid = pid && parseInt(pid) !== NaN && pid.length === 9;

  const hasValidFields =
    validByr &&
    validIyr &&
    validEyr &&
    validHgt &&
    validHcl &&
    validEcl &&
    validPid;

  return hasValidFields ? acc + 1 : acc;
}
