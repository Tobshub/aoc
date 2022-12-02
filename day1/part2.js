const fs = require("fs");

function topThreeElfCalories(raw_data) {
  const calories_arr = raw_data.split('\r\n');

  let elf_sum = 0;
  const max_three = Array(3).fill({ cal: 0, elf_num: 0 })

  let elf_num = 0;
  for (let cal of calories_arr) {
    if (cal === "") {
      inner: for (let i = 0; i < max_three.length; i++) {
        if (max_three[i].cal < elf_sum) {
          max_three.splice(i, 0, { cal: elf_sum, elf_num });
          max_three.pop();
          break inner;
        }
      }
      elf_sum = 0;
      elf_num++;
    } else {
      elf_sum += parseInt(cal);
    }
  }

  const max_sum = max_three[0].cal + max_three[1].cal + max_three[2].cal;
  console.log(max_sum);
}


fs.readFile("./data.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) throw err;
  topThreeElfCalories(data);
})