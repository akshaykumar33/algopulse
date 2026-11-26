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
    const n = readInt();
    const b = readIntArray();
    let c0 = 0, c1 = 0;
    for (const v of b) { if (v === 0) c0++; else c1++; }
    const bonus = (c0 > 0 ? c0 - 1 : 0) + (c1 > 0 ? c1 - 1 : 0);
    print(n + bonus);
  }
}

solve();
printAll();
