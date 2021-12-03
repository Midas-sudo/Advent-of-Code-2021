const fs = require("fs");

var lines = [];
var part = process.argv.slice(2)[0];
var example = process.argv.slice(2)[1];

function part1(array_lines) {
  var gama = 0,
    epsilon = 0;
  var gama_b, epsilon_b;

  var b_size = array_lines[0].trim().length;
  var b_sum = [];

  for (let index = 0; index < b_size; index++) {
    b_sum.push({ n_one: 0, n_zero: 0 });
  }

  array_lines.forEach((line) => {
    var i = 0;
    while (i < b_size) {
      switch (line[i]) {
        case "1":
          b_sum[i].n_one++;
          break;
        case "0":
          b_sum[i].n_zero++;
          break;
      }
      i++;
    }
  });

  gama_b = b_sum.map(function (digit) {
    if (digit.n_one >= digit.n_zero) {
      return 1;
    } else {
      return 0;
    }
  });
  gama_b = gama_b.join("");

  gama = parseInt(gama_b, 2);

  epsilon_b = b_sum.map(function (digit) {
    if (digit.n_one < digit.n_zero) {
      return 1;
    } else {
      return 0;
    }
  });
  epsilon_b = epsilon_b.join("");
  epsilon = parseInt(epsilon_b, 2);

  if (part == "part1") console.log(`Power Consumpion: ${gama * epsilon}\nGama: ${gama} (${gama_b})\nEpsílon: ${epsilon} (${epsilon_b})`);
  return [gama_b, epsilon_b, b_size];
}
function part2() {
  var [gama_b, epsilon_b, b_size] = part1(lines);

  var o2Rating = lines;
  var index = 0;

  while (o2Rating.length != 1) {
    [gama_b, epsilon_b, b_size] = part1(o2Rating);
    o2Rating = o2Rating.flatMap(function (binary) {
      if (index != b_size) {
        if (binary[index] == gama_b[index]) {
          return binary;
        }
        return [];
      }
      return [];
    });
    index++;
    console.log(index);
  }
  var co2Rating = lines;
  index = 0;

  while (co2Rating.length != 1) {
    co2Rating = co2Rating.flatMap(function (binary) {
      [gama_b, epsilon_b, b_size] = part1(co2Rating);
      if (index != b_size) {
        if (binary[index] == epsilon_b[index]) {
          return binary;
        }
        return [];
      }
      return [];
    });
    index++;
    console.log(co2Rating, epsilon_b, index);
  }

  var life_sup = parseInt(o2Rating[0], 2) * parseInt(co2Rating[0], 2);
  console.log(`Life Support: ${life_sup}\nOxygen Generator Rating: ${o2Rating[0]}\nCO2 Scrubber Rating: ${co2Rating[0]}`);
}

switch (part) {
  case "part1":
    if (example) {
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
    part1(lines);
    break;
  case "part2":
    if (example) {
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
