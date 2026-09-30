const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [M, H] = readIntArray();
    const bmi = M / (H * H);
    if (bmi <= 18) {
      print(1);
    } else if (bmi <= 24) {
      print(2);
    } else if (bmi <= 29) {
      print(3);
    } else {
      print(4);
    }
  }
}

solve();
printAll();
