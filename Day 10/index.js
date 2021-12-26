const { groupEnd, count } = require("console");
const fs = require("fs");
const { connect } = require("http2");
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

function median(arr) {
  const mid = Math.floor(arr.length / 2),
    nums = arr.sort((a, b) => a - b);
  console.log(mid, nums);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function part1() {
  var total_error = 0;
  var values = {};
  values[")"] = 3;
  values["]"] = 57;
  values["}"] = 1197;
  values[">"] = 25137;
  for (let line of lines) {
    var input = line.split("");
    var stack = [];
    var found = 0;
    for (let element of line) {
      if (element != "(" && element != "[" && element != "{" && element != "<") {
        var inner = stack.pop();
        switch (inner) {
          case "(":
            if (element != ")") {
              total_error += values[element];
              console.log(`Expected ), but found ${element} instead.`);
              found = 1;
            }
            break;
          case "[":
            if (element != "]") {
              total_error += values[element];
              console.log(`Expected ], but found ${element} instead.`);
              found = 1;
            }
            break;
          case "{":
            if (element != "}") {
              total_error += values[element];
              console.log(`Expected }, but found ${element} instead.`);
              found = 1;
            }
            break;
          case "<":
            if (element != ">") {
              total_error += values[element];
              console.log(`Expected >, but found ${element} instead.`);
              found = 1;
            }
            break;
        }
      } else {
        stack.push(element);
      }
      if (found == 1) break;
    }
  }
  console.log(total_error);
}

function part2() {
  var scores = [],
    index = 0,
    values = {};
  values[")"] = 1;
  values["]"] = 2;
  values["}"] = 3;
  values[">"] = 4;

  while (index < lines.length) {
    var input = lines[index].split("");
    var stack = [];
    var found = 0;
    for (let element of lines[index]) {
      if (element != "(" && element != "[" && element != "{" && element != "<") {
        var inner = stack.pop();
        switch (inner) {
          case "(":
            if (element != ")") {
              lines.splice(index, 1);
              index--;
              console.log(`Expected ), but found ${element} instead.`);
              found = 1;
            }
            break;
          case "[":
            if (element != "]") {
              lines.splice(index, 1);
              index--;
              console.log(`Expected ], but found ${element} instead.`);
              found = 1;
            }
            break;
          case "{":
            if (element != "}") {
              lines.splice(index, 1);
              index--;
              console.log(`Expected }, but found ${element} instead.`);
              found = 1;
            }
            break;
          case "<":
            if (element != ">") {
              lines.splice(index, 1);
              index--;
              console.log(`Expected >, but found ${element} instead.`);
              found = 1;
            }
            break;
        }
      } else {
        stack.push(element);
      }
      if (found == 1) break;
    }
    index++;
  }

  lines.forEach((line) => {
    line = line.split("");
    var score = 0;
    var temp = [];
    line.forEach((element) => {
      if (element == "(" || element == "[" || element == "{" || element == "<") {
        temp.push(element);
      } else {
        temp.pop();
      }
    });
    console.log(temp);
    while (temp.length != 0) {
      var inner = temp.pop();
      switch (inner) {
        case "(":
          console.log(score);
          score *= 5;
          score += values[")"];
          console.log(")");
          break;
        case "[":
          console.log(score);
          score *= 5;
          score += values["]"];

          console.log("]");
          break;
        case "{":
          console.log(score);
          score *= 5;
          score += values["}"];

          console.log("}");
          break;
        case "<":
          console.log(score);
          score *= 5;
          score += values[">"];

          console.log(">");
          break;
      }
    }
    scores.push(score);
  });
  console.log(scores);
  console.log(lines);
  console.log(median(scores));
}
