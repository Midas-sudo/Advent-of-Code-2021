const fs = require("fs");

var lines = [];
var part = process.argv.slice(2)[0];
var example = process.argv.slice(2)[1];

function part1() {
  var sequence = lines[0].split(",");

  var cards = [];
  load_cards(cards);
  console.log(cards);
  var value = 0;
  var index = 0;
  for (index = 0; index < sequence.length; index++) {
    value = check_cards(cards, sequence[index]);
    if (typeof value === "number") break;
  }
  var sum = sum_card(cards[value]);

  console.log("Last Number:", sequence[index], "Winner Card:", value, "Mutiplication:", sum * sequence[index]);
}
function part2() {
  var sequence = lines[0].split(",");

  var cards = [];
  load_cards(cards);
  var value = 0;
  var index = 0;
  for (index = 0; index < sequence.length; index++) {
    while (typeof value === "number") {
      value = check_cards(cards, sequence[index]);
      if (typeof value === "number") cards.splice(value, 1);
      console.log(value);
    }
    value = 0;
    if (cards.length == 1) {
      check_cards(cards, sequence[index]);
      check_cards(cards, sequence[index + 1]);
      break;
    }
  }
  console.log(cards, sequence[index]);
  var sum = sum_card(cards[0]);

  console.log("Last Number:", sequence[index + 1], "Winner Card:", value, "Mutiplication:", sum * sequence[index + 1]);
}

function load_cards(cards) {
  var index = 2;
  while (index < lines.length) {
    var card = [];

    for (let x = 0; x < 5; x++) {
      var numbers = lines[index].trim().split(/\s+/g);
      card[x] = [];
      for (let y = 0; y < 5; y++) {
        var object = { number: numbers[y], found: 0 };
        card[x][y] = object;
      }
      index++;
    }
    index++;
    cards.push(card);
    //console.log(card);
  }
}

function check_cards(cards, number) {
  var index = 0;
  for (index = 0; index < cards.length; index++) {
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        if (cards[index][x][y].number == number) {
          cards[index][x][y].found = 1;
          if (check_line(cards[index]) == "Found It") {
            return index;
          }
        }
      }
    }
  }
  return false;
}
function check_line(card) {
  for (let x = 0; x < 5; x++) {
    if (card[x][0].found == 1 && card[x][1].found == 1 && card[x][2].found == 1 && card[x][3].found == 1 && card[x][4].found == 1) {
      return "Found It";
    }
  }
  for (let y = 0; y < 5; y++) {
    if (card[0][y].found == 1 && card[1][y].found == 1 && card[2][y].found == 1 && card[3][y].found == 1 && card[4][y].found == 1) {
      return "Found It";
    }
  }
}

function sum_card(card) {
  var sum = 0;
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (card[x][y].found == 0) {
        sum += parseInt(card[x][y].number);
      }
    }
  }
  return sum;
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
    part1();
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
