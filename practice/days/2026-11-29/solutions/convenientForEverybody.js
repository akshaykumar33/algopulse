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
  const [s, f] = readIntArray();
  const pref = new Array(2 * n + 1).fill(0);
  for (let i = 0; i < 2 * n; i++) pref[i + 1] = pref[i] + a[i % n];
  let best = -1, ans = 0;
  for (let t = 1; t <= n; t++) {
    let lo = ((s - t) % n + n) % n;
    const len = f - s;
    const cnt = pref[lo + len] - pref[lo];
    if (cnt > best) { best = cnt; ans = t; }
  }
  print(ans);
}

solve();
printAll();
