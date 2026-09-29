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
    const [a, b] = readIntArray();
    const sum = a + b;
    if (sum < 3) {
      print(1);
    } else if (sum <= 10) {
      print(2);
    } else if (sum <= 60) {
      print(3);
    } else {
      print(4);
    }
  }
}

solve();
printAll();
