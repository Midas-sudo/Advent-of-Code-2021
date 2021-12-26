const { groupEnd } = require("console");
const fs = require("fs");

var lines = [];
var part = process.argv.slice(2)[0];
var example = process.argv.slice(2)[1];
var star_map = process.argv.slice(2)[2];
var grid = [];
switch (part) {
  case "part1":
    if (example == "S") {
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
    break;
  case "part2":
    if (example == "S") {
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
    break;
}

function part1() {
  grid_load();
  if (star_map == "S") grid_print();
  var overlapPoints = overlapCounter(2);
  console.log(`There are ${overlapPoints} points that have overlaps.`);
}
function part2() {
  grid_load(true);
  if (star_map == "S") grid_print();
  var overlapPoints = overlapCounter(2);
  console.log(`There are ${overlapPoints} points that have overlaps.`);
}

function grid_load(diagonals = false) {
  lines.forEach((line) => {
    console.log(line);
    var cords = line.split(" -> ");

    var cords_p1 = cords[0].split(",").map(function (item) {
      return parseInt(item, 10);
    });
    var cords_p2 = cords[1].split(",").map(function (item) {
      return parseInt(item, 10);
    });

    if (cords_p1[0] == cords_p2[0]) {
      if (cords_p1[1] > cords_p2[1]) [cords_p2[1], cords_p1[1]] = [cords_p1[1], cords_p2[1]];
      for (let index = cords_p1[1]; index <= cords_p2[1]; index++) {
        if (grid[index] == undefined) grid[index] = [];
        grid[index][cords_p1[0]] = grid[index][cords_p1[0]] ? grid[index][cords_p1[0]] + 1 : 1;
      }
    } else if (cords_p1[1] == cords_p2[1]) {
      if (grid[cords_p1[1]] == undefined) grid[cords_p1[1]] = [];
      if (cords_p1[0] > cords_p2[0]) [cords_p2[0], cords_p1[0]] = [cords_p1[0], cords_p2[0]];
      for (let index = cords_p1[0]; index <= cords_p2[0]; index++) {
        grid[cords_p1[1]][index] = grid[cords_p1[1]][index] ? grid[cords_p1[1]][index] + 1 : 1;
      }
    } else if (diagonals == true) {
      var variation_x = cords_p2[0] > cords_p1[0] ? 1 : -1;
      var variation_y = cords_p2[1] > cords_p1[1] ? 1 : -1;

      var x = cords_p1[0];
      var y = cords_p1[1];
      while (x != cords_p2[0]) {
        if (grid[y] == undefined) grid[y] = [];
        grid[y][x] = grid[y][x] ? grid[y][x] + 1 : 1;
        x += variation_x;
        y += variation_y;
      }
      if (x == cords_p2[0]) {
        if (grid[y] == undefined) grid[y] = [];
        grid[y][x] = grid[y][x] ? grid[y][x] + 1 : 1;
      }
    }
  });
  console.log("\n");
}

function overlapCounter(n) {
  var counter = 0;
  for (let iY = 0; iY < grid.length; iY++) {
    if (grid[iY] == undefined) {
      continue;
    }
    for (let iX = 0; iX < grid[iY].length; iX++) {
      if (grid[iY][iX] >= n) {
        counter++;
      }
    }
  }
  return counter;
}

function grid_print() {
  var size = 0;
  for (let iY = 0; iY < grid.length; iY++) {
    if (grid[iY] != undefined) {
      if (grid[iY].length > size) {
        size = grid[iY].length;
      }
    }
  }
  for (let iY = 0; iY < grid.length; iY++) {
    if (grid[iY] == undefined) {
      for (let index = 0; index < size; index++) {
        process.stdout.write(" .");
      }
      process.stdout.write("\n");
      continue;
    }
    for (let iX = 0; iX < grid[iY].length; iX++) {
      if (grid[iY][iX] == undefined) {
        process.stdout.write(" .");
      } else {
        process.stdout.write(` ${grid[iY][iX]}`);
      }
    }
    if (grid[iY].length < size) {
      for (let index = 0; index < size - grid[iY].length; index++) {
        process.stdout.write(" .");
      }
    }
    process.stdout.write("\n");
  }
}
