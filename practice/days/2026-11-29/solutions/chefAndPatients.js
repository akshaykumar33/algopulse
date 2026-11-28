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
    const idx = Array.from({ length: n }, (_, i) => i);
    idx.sort((x, y) => a[y] - a[x] || x - y);
    const ans = new Array(n);
    for (let r = 0; r < n; r++) ans[idx[r]] = r + 1;
    print(ans.join(' '));
  }
}

solve();
printAll();
