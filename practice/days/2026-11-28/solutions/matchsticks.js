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
  const b = readIntArray();
  let lg = 1;
  while (1 << lg <= n) lg++;
  const mn = [Int32Array.from(b)], mx = [Int32Array.from(b)];
  for (let j = 1; j < lg; j++) {
    const pm = mn[j - 1], px = mx[j - 1], h = 1 << (j - 1);
    const cm = new Int32Array(n), cx = new Int32Array(n);
    for (let i = 0; i + (1 << j) <= n; i++) {
      cm[i] = Math.min(pm[i], pm[i + h]);
      cx[i] = Math.max(px[i], px[i + h]);
    }
    mn.push(cm);
    mx.push(cx);
  }
  const pre = new Int32Array(n + 1), suf = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) pre[i + 1] = Math.max(pre[i], b[i]);
  for (let i = n - 1; i >= 0; i--) suf[i] = Math.max(suf[i + 1], b[i]);
  const q = readInt();
  for (let i = 0; i < q; i++) {
    const [l, r] = readIntArray();
    const j = 31 - Math.clz32(r - l + 1);
    const m = Math.min(mn[j][l], mn[j][r - (1 << j) + 1]);
    const big = Math.max(mx[j][l], mx[j][r - (1 << j) + 1]);
    const out = Math.max(pre[l], suf[r + 1]);
    print(Math.max((m + big) / 2, m + out).toFixed(1));
  }
}

solve();
printAll();
