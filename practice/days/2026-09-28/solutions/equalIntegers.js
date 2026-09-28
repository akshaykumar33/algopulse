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
    const [x, y] = readIntArray();
    if (x <= y) {
      print(y - x);
    } else {
      const diff = x - y;
      if (diff % 2 === 0) {
        print(diff / 2);
      } else {
        print(Math.floor((diff + 1) / 2) + 1);
      }
    }
  }
}

solve();
printAll();
