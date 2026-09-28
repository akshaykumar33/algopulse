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
  const n = readInt();
  let count = 0;
  for (let i = 0; i < n; i++) {
    const [p, v, t] = readIntArray();
    if (p + v + t >= 2) count++;
  }
  print(count);
}

solve();
printAll();
