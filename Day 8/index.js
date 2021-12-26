const { groupEnd, Console } = require("console");
const { sign } = require("crypto");
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
var values = [];
var total = 0;

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
  input_loader();
  var totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  values.forEach((entrie) => {
    entrie.output.forEach((element) => {
      var length = element.length;
      switch (length) {
        case 2:
          totals[1]++;
          break;
        case 3:
          totals[7]++;
          break;
        case 4:
          totals[4]++;
          break;
        case 7:
          totals[8]++;
          break;

        default:
          break;
      }
    });
  });
  console.log(`There are a total of:\n${totals[1]} - One's;\n${totals[4]} - Fours's;\n${totals[7]} - Seven's;\n${totals[8]} - Eight's;\nTotal: ${totals[1] + totals[4] + totals[7] + totals[8]}`);
}

function part2() {
  input_loader2();
  console.log(total);
}

function input_loader() {
  lines.forEach((line) => {
    var input = line.split(" | ");
    var signals = input[0].split(" ");
    var output = input[1].split(" ");
    values.push({ signals: signals, output: output });
  });
}

function input_loader2() {
  lines.forEach((line) => {
    var input = line.split(" | ");
    var signals = input[0].split(" ");
    var output = input[1].split(" ");
    var obj = {};

    signals.sort((a, b) => a.length - b.length);
    var segmentes = [];
    var analizing = signals[1],
      temp,
      i;

    var x = sortAlphabets(signals[0]);
    obj[x] = 1;
    x = sortAlphabets(signals[1]);
    obj[x] = 7;
    x = sortAlphabets(signals[2]);
    obj[x] = 4;
    x = sortAlphabets(signals[9]);
    obj[x] = 8;
    //console.log(signals);

    for (let element of signals[0]) {
      analizing = analizing.replace(element, "");
    }
    segmentes[1] = analizing;

    analizing = signals[0];
    temp = analizing;
    i = 5;
    while (analizing.length !== 1) {
      i++;
      analizing = temp;
      for (let element of signals[i]) {
        analizing = analizing.replace(element, "");
      }
    }
    signals[i] = sortAlphabets(signals[i]);
    obj[signals[i]] = 6;
    segmentes[2] = analizing;

    var a = i;

    i = 5;
    analizing = signals[2];
    temp = analizing;
    while (analizing.length !== 1) {
      i++;
      if (i == a) {
        continue;
      }
      analizing = temp;
      for (let element of signals[i]) {
        analizing = analizing.replace(element, "");
      }
    }
    signals[i] = sortAlphabets(signals[i]);
    obj[signals[i]] = 0;
    segmentes[7] = analizing;

    var b = i;
    var c = 6 + 7 + 8 - a - b;

    signals[c] = sortAlphabets(signals[c]);
    obj[signals[c]] = 9;

    i = 2;
    analizing = "";
    while (analizing.length != 1) {
      i++;
      analizing = signals[i];
      for (let element of signals[c]) {
        analizing = analizing.replace(element, "");
      }
    }
    signals[i] = sortAlphabets(signals[i]);
    obj[signals[i]] = 2;
    var d = i;

    i = 2;
    analizing = "";
    while (analizing.length != 1) {
      i++;
      analizing = signals[i];
      for (let element of signals[d]) {
        analizing = analizing.replace(element, "");
      }
    }
    signals[i] = sortAlphabets(signals[i]);
    obj[signals[i]] = 3;
    obj.index3 = i;
    var e = i;

    i = 2;
    analizing = "";
    while (analizing.length != 1) {
      i++;
      if (i == d) {
        continue;
      }
      analizing = signals[i];
      for (let element of signals[e]) {
        analizing = analizing.replace(element, "");
      }
    }
    signals[i] = sortAlphabets(signals[i]);
    obj[signals[i]] = 5;
    obj.index5 = i;

    //console.log(obj);

    var number = "";

    output.forEach((element) => {
      element = sortAlphabets(element);
      var digit = obj[element];
      number = number.concat(`${digit}`);
    });
    obj.number = number;
    total += parseInt(number);

    values.push(obj);
  });
}

function sortAlphabets(text) {
  var new_txt = text
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  return new_txt;
}
