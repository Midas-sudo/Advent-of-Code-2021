const fs = require("fs");

const file = fs.readFileSync("input.txt", "utf-8");
var lines = [];

file.split(/\r?\n/).forEach((line) => {
  lines.push(line);
});

function part1() {
  var prev_depth = 0,
    incre_count = 0,
    decres_count = 0;

  lines.forEach((depth) => {
    if (depth > prev_depth) {
      incre_count++;
      prev_depth = depth;
    } else {
      decres_count++;
      prev_depth = depth;
    }
  });

  console.log(incre_count, decres_count);
}

function part2() {
  var incre_count = 0,
    decres_count = 0;

  for (let index = 0; index + 3 < lines.length; index++) {
    var depth1 = parseInt(lines[index]) + parseInt(lines[index + 1]) + parseInt(lines[index + 2]);
    var depth2 = parseInt(lines[index + 1]) + parseInt(lines[index + 2]) + parseInt(lines[index + 3]);

    console.log(depth1, depth2);
    if (depth2 > depth1) {
      incre_count++;
    } else {
      decres_count++;
    }
  }

  console.log(incre_count, decres_count);
}

part2();
