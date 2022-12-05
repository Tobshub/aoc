const fs = require("fs");

const original_crates = {
  1: ['S', 'C', 'V', 'N'],
  2: ['Z', 'M', 'J', 'H', 'N', 'S'],
  3: ['M', 'C', 'T', 'G', 'J', 'N', 'D'],
  4: ['T', 'D', 'F', 'J', 'W', 'R', 'M'],
  5: ['P', 'F', 'H'],
  6: ['C', 'T', 'Z', 'H', 'J'],
  7: ['D', 'P', 'R', 'Q', 'F', 'S', 'L', 'Z'],
  8: ['C', 'S', 'L', 'H', 'D', 'F', 'P', 'W'],
  9: ['D', 'S', 'M', 'P', 'F', 'N', 'G', 'Z']
}


function rearrangeProcedure(raw_data) {
  const procedure = raw_data.split("\r\n").map(step => step.split(' ')).map(step => ({
    [step[0]]: parseInt(step[1]),
    [step[2]]: parseInt(step[3]),
    [step[4]]: parseInt(step[5])
  }));
  const crates = { ...original_crates };

  for (let step of procedure) {
    const { move, from, to } = step;
    for (let i = 0; i < move; i++) {
      const moving = crates[from].pop();
      crates[to].push(moving);
    }
  }

  for (let stack in crates) {
    console.log({ [stack]: crates[stack].slice(-1) })
  }
}

fs.readFile("procedure.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  rearrangeProcedure(data)
})