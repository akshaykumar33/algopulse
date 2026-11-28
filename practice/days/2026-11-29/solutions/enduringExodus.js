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
  const [n, k] = readIntArray();
  const s = readLine();
  const f = [];
  for (let i = 0; i < n; i++) if (s[i] === "0") f.push(i);
  let ans = Infinity, mid = 0;
  for (let i = 0; i + k < f.length; i++) {
    const l = f[i], r = f[i + k];
    if (mid < i) mid = i;
    while (mid + 1 <= i + k && Math.max(f[mid + 1] - l, r - f[mid + 1]) <= Math.max(f[mid] - l, r - f[mid])) mid++;
    ans = Math.min(ans, Math.max(f[mid] - l, r - f[mid]));
  }
  print(ans);
}

solve();
printAll();
