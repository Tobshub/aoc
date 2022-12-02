const fs = require("fs");

const encryption_key = {
  "A": { beats: "C", value: 1 },
  "B": { beats: "A", value: 2 },
  "C": { beats: "B", value: 3 }
};

const outcomes = {
  "X": 0,
  "Y": 3,
  "Z": 6,
}


function scoreFromGuide(raw_data) {
  const games = raw_data.split("\r\n").map((game) => game.split(" "));
  let score = 0;
  for (let game of games) {
    const [opp, outcome] = game;
    let points = outcomes[outcome];
    if (outcome === "X") {
      points += encryption_key[encryption_key[opp].beats].value;
    } else if (outcome === "Y") {
      points += encryption_key[opp].value;
    } else {
      points += encryption_key[encryption_key[encryption_key[opp].beats].beats].value;
    }
    score += points;
  }

  console.log({ score });
}

fs.readFile("./strategy-guide.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  scoreFromGuide(data);
})