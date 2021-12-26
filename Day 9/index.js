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
  var total_risk = 0;
  var ix = 0;
  for (let index = 0; index < lines.length; index++) {
    ix = 0;
    prev_line =
      lines[index - 1] == undefined
        ? []
        : lines[index - 1].split("").map(function (item) {
            return parseInt(item, 10);
          });
    curr_line = lines[index].split("").map(function (item) {
      return parseInt(item, 10);
    });
    next_line =
      lines[index + 1] == undefined
        ? []
        : lines[index + 1].split("").map(function (item) {
            return parseInt(item, 10);
          });

    curr_line.forEach((element) => {
      if (
        (element < prev_line[ix] || prev_line[ix] == undefined) &&
        (element < next_line[ix] || next_line[ix] == undefined) &&
        (element < curr_line[ix - 1] || curr_line[ix - 1] == undefined) &&
        (element < curr_line[ix + 1] || curr_line[ix + 1] == undefined)
      ) {
        //console.log("here");
        total_risk += element + 1;
      }
      ix++;
    });
  }
  console.log(total_risk);
}

function part2() {
  var grid = [];
  var x = -1,
    y = 0;
  for (let index = 0; index < lines.length; index++) {
    grid[index] = lines[index].split("").map(function (item) {
      x++;
      return { x: x, y: y, value: parseInt(item, 10) };
    });
    x = -1;
    y++;
  }
  var low_points = [];
  var ix = 0;
  var iy = 0;
  grid.forEach((row) => {
    row.forEach((element) => {
      //console.log(element);
      if (ix == 0 && iy == 0) {
        if (element.value < row[ix + 1].value && element.value < grid[iy + 1][ix].value) {
          low_points.push(element);
        }
      } else if (ix == row.length - 1 && iy == 0) {
        if (element.value < row[ix - 1].value && element.value < grid[iy + 1][ix].value) {
          low_points.push(element);
        }
      } else if (ix == 0 && iy == grid.length - 1) {
        if (element.value < row[ix + 1].value && element.value < grid[iy - 1][ix].value) {
          low_points.push(element);
        }
      } else if (ix == row.length - 1 && iy == grid.length - 1) {
        if (element.value < row[ix - 1].value && element.value < grid[iy - 1][ix].value) {
          low_points.push(element);
        }
      } else if (ix == 0) {
        if (element.value < row[ix + 1].value && element.value < grid[iy - 1][ix].value && element.value < grid[iy + 1][ix].value) {
          low_points.push(element);
        }
      } else if (ix == row.length - 1) {
        if (element.value < row[ix - 1].value && element.value < grid[iy - 1][ix].value && element.value < grid[iy + 1][ix].value) {
          low_points.push(element);
        }
      } else if (iy == 0) {
        if (element.value < row[ix + 1].value && element.value < row[ix - 1].value && element.value < grid[iy + 1][ix].value) {
          low_points.push(element);
        }
      } else if (iy == grid.length - 1) {
        if (element.value < row[ix + 1].value && element.value < row[ix - 1].value && element.value < grid[iy - 1][ix].value) {
          low_points.push(element);
        }
      } else {
        if (element.value < row[ix + 1].value && element.value < row[ix - 1].value && element.value < grid[iy + 1][ix].value && element.value < grid[iy - 1][ix].value) {
          low_points.push(element);
        }
      }
      ix++;
    });
    ix = 0;
    iy++;
  });
  var stack = [];
  var pockets = [];
  low_points.forEach((element) => {
    var size = 1;
    ix = element.x;
    iy = element.y;
    grid[iy][ix].seen = 1;
    if (grid[iy - 1] != undefined) if (grid[iy - 1][ix].seen != 1 && grid[iy - 1][ix].value != 9) stack.push(grid[iy - 1][ix]);
    if (grid[iy + 1] != undefined) if (grid[iy + 1][ix].seen != 1 && grid[iy + 1][ix].value != 9) stack.push(grid[iy + 1][ix]);
    if (grid[iy][ix - 1] != undefined) if (grid[iy][ix - 1].seen != 1 && grid[iy][ix - 1].value != 9) stack.push(grid[iy][ix - 1]);
    if (grid[iy][ix + 1] != undefined) if (grid[iy][ix + 1].seen != 1 && grid[iy][ix + 1].value != 9) stack.push(grid[iy][ix + 1]);
    while (stack.length != 0) {
      size++;
      var current = stack.shift();
      ix = current.x;
      iy = current.y;
      grid[iy][ix].seen = 1;
      if (grid[iy - 1] != undefined)
        if (grid[iy - 1][ix].seen != 1 && grid[iy - 1][ix].value != 9) {
          grid[iy - 1][ix].seen = 1;
          stack.push(grid[iy - 1][ix]);
        }
      if (grid[iy + 1] != undefined)
        if (grid[iy + 1][ix].seen != 1 && grid[iy + 1][ix].value != 9) {
          grid[iy + 1][ix].seen = 1;
          stack.push(grid[iy + 1][ix]);
        }
      if (grid[iy][ix - 1] != undefined)
        if (grid[iy][ix - 1].seen != 1 && grid[iy][ix - 1].value != 9) {
          grid[iy][ix - 1].seen = 1;
          stack.push(grid[iy][ix - 1]);
        }
      if (grid[iy][ix + 1] != undefined)
        if (grid[iy][ix + 1].seen != 1 && grid[iy][ix + 1].value != 9) {
          grid[iy][ix + 1].seen = 1;
          stack.push(grid[iy][ix + 1]);
        }
    }
    pockets.push(size);
    stack = [];
  });
  pockets.sort((a, b) => {
    return b - a;
  });

  // console.log(low_points);
  console.log(pockets);
  console.log(pockets[0] * pockets[1] * pockets[2]);
}
