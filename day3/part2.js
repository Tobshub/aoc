const fs = require("fs");

function missingBadgesPriority(raw_data) {
  const rucksacks = raw_data.split("\r\n");
  let first_in_group = 0; // add 3 after every iteration;
  let badge_priority_sum = 0;
  while (first_in_group < rucksacks.length - 2) {
    const [first, second, third] = rucksacks.slice(first_in_group, first_in_group + 3);
    let inAll = null;
    inner: for (let item of first) {
      if (second.includes(item) && third.includes(item)) {
        inAll = item;
        break inner;
      }
    }
    const inAllCode = inAll.charCodeAt(0);
    badge_priority_sum += (inAllCode <= 90) ? inAllCode - 38 : inAllCode - 96;
    first_in_group += 3;
  }
  console.log(badge_priority_sum);
}


fs.readFile("./rucksacks.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  missingBadgesPriority(data);
})