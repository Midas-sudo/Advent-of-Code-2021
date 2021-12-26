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

function part1() {}

function part2() {}
