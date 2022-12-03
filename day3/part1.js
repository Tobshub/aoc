const fs = require("fs");

function missingItemsPriority(raw_data) {
  const rucksacks = raw_data.split("\r\n").map(rucksack => [rucksack.slice(0, Math.floor(rucksack.length / 2)), rucksack.slice(Math.floor(rucksack.length / 2))]);

  let missing_items_priority_sum = 0;

  for (let compartments of rucksacks) {
    const [first, second] = compartments;
    let inBoth = null;
    inner: for (let item of first) {
      if (second.includes(item)) {
        inBoth = item;
        break inner;
      }
    }
    const inBothCode = inBoth.charCodeAt(0);
    missing_items_priority_sum += (inBothCode <= 90) ? inBothCode - 38 : inBothCode - 96;
  }

  console.log(missing_items_priority_sum);
}


fs.readFile("./rucksacks.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  missingItemsPriority(data);
})