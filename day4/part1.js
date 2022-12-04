const fs = require("fs");

function rangeContainedPair(raw_data) {
  const pair_ranges = raw_data.split("\r\n").map(pair => (
    pair.split(',')
  )).map(ranges => ranges.map(range => range.split('-')).map(range => [parseInt(range[0]), parseInt(range[1])]));

  let contained_pairs = 0;

  for (let range of pair_ranges) {
    const [first, second] = range;
    if (first[0] <= second[0] && second[1] <= first[1]) {
      contained_pairs++;
    } else if (second[0] <= first[0] && first[1] <= second[1]) {
      contained_pairs++;
    }
  }
  console.log({ contained_pairs });
}

fs.readFile(__dirname + "/assignment-pairs.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  rangeContainedPair(data);
})