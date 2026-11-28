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
    const [n, k] = readIntArray();
    if (k === 0) {
      const arr = [];
      for (let i = 1; i <= n; i++) arr.push(i);
      print(arr.join(' '));
      continue;
    }
    let h = 0;
    while ((1 << (h + 1)) <= k) h++;
    let x = -1;
    for (let v = 1; v <= n; v++) {
      if ((v >> h) & 1 && (v ^ k) >= 1 && (v ^ k) < v) {
        x = v;
        break;
      }
    }
    if (x === -1) {
      print(-1);
      continue;
    }
    const y = x ^ k;
    const b = ((x >> (h + 1)) << (h + 1)) + (1 << h);
    const arr = [];
    for (let i = 1; i < y; i++) arr.push(i);
    for (let i = y + 1; i < b; i++) arr.push(i);
    arr.push(x, y);
    for (let i = b; i < x; i++) arr.push(i);
    for (let i = x + 1; i <= n; i++) arr.push(i);
    print(arr.join(' '));
  }
}

solve();
printAll();
