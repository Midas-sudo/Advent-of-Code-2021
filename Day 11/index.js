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
  var grid = [];
  l_array = [];
  var ix = 0;
  var iy = 0;
  var counter = 0;
  lines.forEach((line) => {
    l_array = [];
    var values = line.split("");
    values.forEach((element) => {
      l_array.push({ x: ix, y: iy, energy: element, staged: 0 });
      ix++;
    });
    iy++;
    ix = 0;
    grid.push(l_array);
  });
  //console.log(grid);
  counter = exploder(counter, grid);
  grid.forEach((element) => {
    element.forEach((element1) => {
      process.stdout.write(`${element1.energy}`);
    });
    process.stdout.write("\n");
  });
  console.log(counter);
}

function part2() {}

function exploder(grid) {
  var counter = 0;
  var exploded = 0;
  while (true) {
    exploded = 0;
    grid.forEach((line) => {
      line.forEach((squid) => {
        squid.energy++;
        if (squid.energy > 9) {
          exploded++;
          for (let iy = squid.y - 1; iy <= squid.y + 1; iy++) {
            for (let ix = squid.x - 1; ix <= squid.x + 1; ix++) {
              if (grid[iy] == undefined) continue;
              if (grid[iy][ix] == undefined || iy == ix) continue;
              grid[iy][ix].energy++;
            }
          }
        }
      });
    });
    if (exploded == 0) break;
    counter += exploded;
  }
  console.log(counter);
}

function recursive(grid, squid, exploded) {
  for (let iy = squid.y - 1; iy <= squid.y + 1; iy++) {
    for (let ix = squid.x - 1; ix <= squid.x + 1; ix++) {
      console.log(iy, ix);
      if (grid[iy] == undefined) continue;
      if (grid[iy][ix] == undefined || iy == ix) continue;
      if (grid[iy][ix].staged == 0) {
        grid[iy][ix].energy++;
        if (iy == 1 && ix == 1) console.log("\n\n\n\n\n teste");
        if (grid[iy][ix].energy > 9) {
          grid[iy][ix].staged = 1;
          recursive(grid, squid, exploded);
          exploded.push(grid[iy][ix]);
        }
      }
    }
  }
  return exploded;
}

// });
// console.log(grid);
// process.stdout.write("\n");
// while (to_check.length != 0) {
//   var squid = to_check.shift();
//   if (squid.energy > 9) {
//     counter++;
//     squid.energy = 0;
//     exploded.push(squid);
//     for (let iy = squid.y - 1; iy <= squid.y + 1; iy++) {
//       for (let ix = squid.x - 1; ix <= squid.x + 1; ix++) {
//         if (grid[iy] == undefined) continue;
//         if (grid[iy][ix] == undefined || iy == ix) continue;
//         if (grid[iy][ix].staged == 0) {
//           grid[iy][ix].staged = 1;
//           grid[iy][ix].energy++;
//           to_check.push(grid[iy][ix]);
//         }
//       }
//     }
//   } else {
//     squid.staged == 0;
//   }
// }
