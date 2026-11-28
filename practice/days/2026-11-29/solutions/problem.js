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
  const cnt = new Map();
  const order = [];
  for (let i = 0; i < n; i++) {
    if (a[i] === 0) continue;
    if (!cnt.has(a[i])) { cnt.set(a[i], 0); order.push(a[i]); }
    cnt.set(a[i], cnt.get(a[i]) + 1);
  }
  let pos = 0, ans = 0;
  for (const p of order) {
    const c = cnt.get(p);
    for (let j = 0; j < c; j++, pos++) if (a[pos] !== p) ans++;
  }
  print(ans);
}

solve();
printAll();
