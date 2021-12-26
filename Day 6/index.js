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
  .option("lenght", {
    alias: "l",
    description: "Number of days to run simulations",
    type: "number",
    default: 80,
  })
  .option("print", {
    alias: "p",
    description: "Print full list",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

var lines = [];
var total_fishes = [];

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
  var indiv_fish = lines[0].split(",");
  if (argv.print) console.log(`Initial state: ${indiv_fish}`);

  for (let index = 0; index < argv.lenght; index++) {
    if (argv.print) process.stdout.write(`\nAfter ${index + 1}:  `);
    var new_fishes = [];
    indiv_fish = indiv_fish.map((fish) => {
      fish -= 1;
      if (fish < 0) {
        new_fishes.push(8);
        fish = 6;
      }
      if (argv.print) process.stdout.write(`${fish},`);
      return fish;
    });
    if (argv.print) {
      new_fishes.forEach((fishy) => {
        process.stdout.write(`${fishy},`);
      });
    }
    indiv_fish = indiv_fish.concat(new_fishes);
  }
  console.log(`\nAfter ${argv.lenght} days the lanternfish would be a total of: ${indiv_fish.length}`);
}

function part2() {
  var fishes = { ages_num: new Array(9), total: 0 };
  fishes.ages_num.fill(0);
  var indiv_fish = lines[0].split(",").map(function (item) {
    return parseInt(item, 10);
  });
  indiv_fish.forEach((fish) => {
    fishes.ages_num[fish]++;
    fishes.total++;
  });

  for (let index = 0; index < argv.lenght; index++) {
    var age_0 = fishes.ages_num.shift();
    fishes.ages_num[6] += age_0;
    fishes.ages_num.push(age_0);
    fishes.total += age_0;
  }
  console.log(`\nAfter ${argv.lenght} days the lanternfish would be a total of: ${fishes.total}`);
}
