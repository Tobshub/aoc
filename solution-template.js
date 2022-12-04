const fs = require("fs");

function solution(raw_data) {

}

fs.readFile("input-data.txt", (err, data) => {
  if (err) throw err;
  solution(data);
})