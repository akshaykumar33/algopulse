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
  let y = 0, mx = 0, mn = 0, w = 0;
  for (let i = 0; i < n; i++) {
    y += i % 2 === 0 ? a[i] : -a[i];
    mx = Math.max(mx, y);
    mn = Math.min(mn, y);
    w += a[i];
  }
  const h = mx - mn;
  const g = Array.from({ length: h }, () => new Array(w).fill(" "));
  let x = 0;
  y = -mn;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < a[i]; j++, x++) {
      if (i % 2 === 0) { g[h - 1 - y][x] = "/"; y++; }
      else { y--; g[h - 1 - y][x] = "\\"; }
    }
  }
  for (const row of g) print(row.join(""));
}

solve();
printAll();
