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
  const a = readIntArray();
  let bits = 0, top = -1, e = a[0], c = 0;
  for (let i = 0; i <= n; i++) {
    const nx = i < n ? a[i] : Infinity;
    while (c > 0 && e < nx) {
      if (c & 1) { bits++; top = e; }
      c = Math.floor(c / 2);
      e++;
    }
    if (i < n) { e = nx; c++; }
  }
  print(top + 1 - bits);
}

solve();
printAll();
