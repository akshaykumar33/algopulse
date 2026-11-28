const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const MOD = 998244353;

function solve() {
  const n = readInt();
  const a = readIntArray();
  const b = readIntArray();
  const hi = new Array(n), lo = new Array(n), cm = new Array(n), idx = new Array(n);
  for (let i = 0; i < n; i++) {
    const w = (i + 1) * (n - i);
    const wh = Math.floor(w / 100000), wl = w % 100000;
    const low = a[i] * wl;
    hi[i] = a[i] * wh + Math.floor(low / 100000);
    lo[i] = low % 100000;
    cm[i] = (a[i] * (w % MOD)) % MOD;
    idx[i] = i;
  }
  idx.sort((x, y) => hi[y] - hi[x] || lo[y] - lo[x]);
  b.sort((x, y) => x - y);
  let ans = 0;
  for (let i = 0; i < n; i++) ans = (ans + (cm[idx[i]] * b[i]) % MOD) % MOD;
  print(ans);
}

solve();
printAll();
