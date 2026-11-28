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
    const a = readIntArray();
    const best = new Int32Array(n + 2).fill(-1);
    let closed = 0;
    for (let i = 0; i < n; i++) {
      const v = a[i];
      let cur = -1;
      if (v === 1) cur = closed + 1;
      else if (best[v - 1] >= 0) cur = best[v - 1] + 1;
      if (cur > best[v]) best[v] = cur;
      if (best[v] > closed) closed = best[v];
    }
    print(closed);
  }
}

solve();
printAll();
