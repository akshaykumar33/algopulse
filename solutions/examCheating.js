const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solveCase(a, b) {
  let diff = Math.abs(a - b);
  let count = 0;
  for (let d = 1; d * d <= diff; d++) {
    if (diff % d === 0) {
      count++;
      if (d * d !== diff) count++;
    }
  }
  return count;
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [a, b] = readIntArray();
    print(solveCase(a, b));
  }
}

solve();
printAll();
