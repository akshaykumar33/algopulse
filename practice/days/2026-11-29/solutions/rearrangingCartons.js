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
  const b = readIntArray();
  const pos = new Map();
  for (let i = 0; i < n; i++) pos.set(b[i], i + 1);
  const bit = new Int32Array(n + 1);
  let ans = 0;
  for (let i = n - 1; i >= 0; i--) {
    const p = pos.get(a[i]);
    for (let j = p - 1; j > 0; j -= j & -j) ans += bit[j];
    for (let j = p; j <= n; j += j & -j) bit[j]++;
  }
  print(ans);
}

solve();
printAll();
