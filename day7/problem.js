fs = require("fs");

fs.readFile("./input.txt", "utf8", function (err, inputData) {
  if (err) {
    return console.log(err);
  }

  console.log(part1(inputData.trim().split("\n")));
  console.log(part2(inputData.trim().split("\n")));
});

function part1(input) {
  let validBags = [];

  const getValidParentBags = (searchItem) => {
    const validRules = input.filter((rule) => rule.includes(` ${searchItem}`));

    validRules.forEach((validRule) => {
      const newSearchItem = validRule.substring(
        0,
        validRule.indexOf("s contain")
      );
      validBags.push(newSearchItem);
      getValidParentBags(newSearchItem);
    });
  };

  getValidParentBags("shiny gold bag");

  // Remove duplicates
  return new Set(validBags).size;
}

function part2(input) {
  const getNumberOfChildrenForParent = (parent) => {
    const parentRule = input
      .find(($) => $.includes(`${parent}s contain`))
      .replace(".", "");

    const childrenRules = parentRule
      .substring(parentRule.indexOf("contain") + "contain".length)
      .split(",")
      .map(($) => $.trim().replace("bags", "bag"));

    return childrenRules.reduce((acc, rule) => {
      if (rule.includes("no other bag")) return acc;

      const numBags = parseInt(rule.substring(0, 1));
      const bagType = rule.substring(2);

      return acc + numBags + numBags * getNumberOfChildrenForParent(bagType);
    }, 0);
  };

  return getNumberOfChildrenForParent("shiny gold bag");
}
