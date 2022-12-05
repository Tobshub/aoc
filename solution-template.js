const fs = require("fs");

function solution(raw_data) {

}

fs.readFile("input-data.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  solution(data);
})