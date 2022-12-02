const fs = require("fs");

function maxElfCalories(raw_data) {
  const calories_arr = raw_data.split('\r\n');

  let sum_calroies = 0;
  let max = { cal: 0, elf_num: 0 };
  let elf_num = 0;
  for (let cal of calories_arr) {
    if (cal === '') {
      max = (max.cal > sum_calroies) ? max : { cal: sum_calroies, elf_num };
      elf_num++;
      sum_calroies = 0;
    }
    else {
      sum_calroies += parseInt(cal);
    }
  }


  console.log(max, sum_calroies);
  return max;
}


fs.readFile("./data.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  maxElfCalories(data);
})
