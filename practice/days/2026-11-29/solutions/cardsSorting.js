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
  const bit = new Int32Array(n + 1);
  const add = (i, v) => { for (; i <= n; i += i & -i) bit[i] += v; };
  const sum = (i) => { let s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; };
  for (let i = 1; i <= n; i++) add(i, 1);
  const pos = Array.from({ length: 100001 }, () => []);
  for (let i = 0; i < n; i++) pos[a[i]].push(i + 1);
  let cur = 0, ans = 0;
  for (let v = 1; v <= 100000; v++) {
    const p = pos[v];
    if (!p.length) continue;
    let lo = -1;
    for (const x of p) if (x < cur) lo = x;
    if (lo === -1) {
      const nx = p[p.length - 1];
      ans += sum(nx) - sum(cur);
      cur = nx;
    } else {
      ans += sum(n) - sum(cur) + sum(lo);
      cur = lo;
    }
    for (const x of p) add(x, -1);
  }
  print(ans);
}

solve();
printAll();
