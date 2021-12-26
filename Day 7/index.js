const { groupEnd } = require("console");
const fs = require("fs");
const yargs = require("yargs");

const argv = yargs
  .option("part1", {
    alias: "p1",
    description: "Runs Part 1",
    type: "boolean",
  })
  .option("part2", {
    alias: "p2",
    description: "Runs Part 2",
    type: "boolean",
  })
  .option("example", {
    alias: "e",
    description: "Uses the example input",
    type: "boolean",
  })
  .option("print", {
    alias: "p",
    description: "Print full list",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

var lines = [];

if (argv.part1) {
  if (argv.example) {
    const file = fs.readFileSync("example.txt", "utf-8");
    file.split(/\r?\n/).forEach((line) => {
      lines.push(line);
    });
  } else {
    const file = fs.readFileSync("input.txt", "utf-8");
    file.split(/\r?\n/).forEach((line) => {
      lines.push(line);
    });
  }
  part1();
}

if (argv.part2) {
  if (argv.example) {
    const file = fs.readFileSync("example.txt", "utf-8");
    file.split(/\r?\n/).forEach((line) => {
      lines.push(line);
    });
  } else {
    const file = fs.readFileSync("input.txt", "utf-8");
    file.split(/\r?\n/).forEach((line) => {
      lines.push(line);
    });
  }
  part2();
}

function part1() {
  var crabs = lines[0].split(",").map(function (item) {
    return parseInt(item, 10);
  });
  crabs.sort((a, b) => a - b);
  var min = crabs[0];
  var max = crabs[crabs.length - 1];
  var solutions = new Array(max);
  solutions.fill(0);
  console.log(min, max, crabs.length);

  for (let index = 0; index < solutions.length; index++) {
    crabs.forEach((crab) => {
      solutions[index] += crab - index > 0 ? crab - index : -(crab - index);
    });
  }
  solutions.sort((a, b) => a - b);
  console.log(solutions[0]);
}

function part2() {
  var crabs = lines[0].split(",").map(function (item) {
    return parseInt(item, 10);
  });
  crabs.sort((a, b) => a - b);
  var min = crabs[0];
  var max = crabs[crabs.length - 1];
  var solutions = new Array(max);
  solutions.fill(0);
  console.log(min, max, crabs.length);

  for (let index = 0; index < solutions.length; index++) {
    crabs.forEach((crab) => {
      solutions[index] += crab - index > 0 ? ((crab - index) * (crab - index + 1)) / 2 : (-(crab - index) * (-(crab - index) + 1)) / 2;
    });
  }
  solutions.sort((a, b) => a - b);
  console.log(solutions[0]);
}
