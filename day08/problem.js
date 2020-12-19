fs = require("fs");

fs.readFile("./input.txt", "utf8", function (err, inputData) {
  if (err) {
    return console.log(err);
  }

  console.log(part1(inputData.trim().split("\n")));
  console.log(part2(inputData.trim().split("\n")));
});

function getNext(instruction, currentIndex, currentAcc) {
  const [command, value] = instruction.split(" ");
  switch (command) {
    case "acc":
      return [currentIndex + 1, currentAcc + parseInt(value)];
    case "jmp":
      return [currentIndex + parseInt(value), currentAcc];
    case "nop":
    default:
      return [currentIndex + 1, currentAcc];
  }
}

function runProgram(instructions) {
  const visited = [];
  let currentIndex = 0;
  let currentAcc = 0;

  while (!visited[currentIndex] && currentIndex < instructions.length) {
    visited[currentIndex] = true;

    [currentIndex, currentAcc] = getNext(
      instructions[currentIndex],
      currentIndex,
      currentAcc
    );
  }

  const hasInfiniteLoop = currentIndex < instructions.length;
  return [currentAcc, hasInfiniteLoop];
}

function part1(instructions) {
  const [currentAcc] = runProgram(instructions);
  return currentAcc;
}

function part2(instructions) {
  const modifyInstruction = (instruction) => {
    if (instruction.includes("jmp")) return instruction.replace("jmp", "nop");
    if (instruction.includes("nop")) return instruction.replace("nop", "jmp");
    return instruction;
  };

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    const modifiedInstructions = [...instructions];
    modifiedInstructions[i] = modifyInstruction(instruction);

    const [acc, hasInfiniteLoop] = runProgram(modifiedInstructions);
    if (!hasInfiniteLoop) return acc;
  }
}
