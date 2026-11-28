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
    const arr = readIntArray();
    let big = 0, neg = 0, one = 0;
    for (let i = 0; i < n; i++) {
      const v = arr[i];
      if (v === 1) one++;
      else if (v === -1) neg++;
      else if (v !== 0) big++;
    }
    let ok = big <= 1;
    if (neg >= 2 && one === 0) ok = false;
    if (big === 1 && neg >= 1) ok = false;
    print(ok ? 1 : 0);
  }
}

solve();
printAll();
