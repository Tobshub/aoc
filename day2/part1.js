const fs = require("fs");

const opponent_encryption_key = {
  "A": { beats: ["C", "Z"], value: 1 },
  "B": { beats: ["A", "X"], value: 2 },
  "C": { beats: ["B", "Y"], value: 3 }
};
const my_encryption_key = {
  "X": { beats: ["C", "Z"], value: 1 },
  "Y": { beats: ["A", "X"], value: 2 },
  "Z": { beats: ["B", "Y"], value: 3 }
};

const outcomes = {
  win: 6,
  lose: 0,
  draw: 3,
};

function scoreFromGuide(raw_data) {
  const games = raw_data.split("\r\n").map((game) => game.split(" "));
  let score = 0;

  for (let game of games) {
    const [opp, me] = game;
    let points = my_encryption_key[me].value;
    if (opponent_encryption_key[opp].beats.includes(me)) {
      points += outcomes.lose;
    } else if (my_encryption_key[me].beats.includes(opp)) {
      points += outcomes.win;
    } else {
      points += outcomes.draw;
    }
    score += points;
  }

  console.log({ score });
}


fs.readFile("./strategy-guide.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  scoreFromGuide(data);
})