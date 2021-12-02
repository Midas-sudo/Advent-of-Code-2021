const fs = require("fs");

const file = fs.readFileSync("input.txt", "utf-8");
var lines = [];

file.split(/\r?\n/).forEach((line) => {
  lines.push(line);
});

function part1() {
  var horizontal = 0,
    vertical = 0;
  lines.forEach((line) => {
    var move = line.split(" ");
    direction = move.shift();
    var amount = move.shift();
    switch (direction) {
      case "forward":
        horizontal += parseInt(amount);
        break;
      case "down":
        vertical += parseInt(amount);
        break;
      case "up":
        vertical -= parseInt(amount);
        break;

      default:
        break;
    }
  });
  console.log(`Horizontal: ${horizontal}\nVertical: ${vertical}\nMultiplication: ${horizontal*vertical}`);
}
function part2() {
    var horizontal = 0,
    vertical = 0,
    aim =0;
  lines.forEach((line) => {
    var move = line.split(" ");
    direction = move.shift();
    var amount = move.shift();
    switch (direction) {
      case "forward":
        horizontal += parseInt(amount);
        vertical += parseInt(amount)*aim;
        break;
      case "down":
        aim += parseInt(amount);
        break;
      case "up":
        aim -= parseInt(amount);
        break;

      default:
        break;
    }})
    console.log(`Horizontal: ${horizontal}\nVertical: ${vertical}\nMultiplication: ${horizontal*vertical}`);
}

var part = process.argv.slice(2)[0];
console.log(process.argv, part);
switch (part) {
  case "part1":
    console.log("teste");
    part1();
    break;
  case "part2":
    part2();
    break;

  default:
    break;
}
