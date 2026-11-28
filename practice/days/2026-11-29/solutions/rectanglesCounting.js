const fs = require('fs');
const data = fs.readFileSync(0);
let pos = 0;

const readInt = () => {
  while (pos < data.length && data[pos] !== 45 && (data[pos] < 48 || data[pos] > 57)) pos++;
  if (pos >= data.length) return 0;
  let neg = false;
  if (data[pos] === 45) {
    neg = true;
    pos++;
  }
  let x = 0;
  while (data[pos] >= 48 && data[pos] <= 57) x = x * 10 + data[pos++] - 48;
  return neg ? -x : x;
};

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  while (true) {
    const n = readInt();
    if (n === 0) break;
    const xs = new Float64Array(n), ys = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      xs[i] = readInt();
      ys[i] = readInt();
    }
    const idx = new Int32Array(n);
    for (let i = 0; i < n; i++) idx[i] = i;
    idx.sort((a, b) => xs[a] - xs[b]);
    const lo = [], hi = [];
    for (let i = 0; i + 1 < n; i++) {
      if (xs[idx[i]] !== xs[idx[i + 1]]) continue;
      const a = ys[idx[i]], b = ys[idx[i + 1]];
      lo.push(Math.min(a, b));
      hi.push(Math.max(a, b));
      i++;
    }
    const k = lo.length;
    const ord = new Int32Array(k);
    for (let i = 0; i < k; i++) ord[i] = i;
    ord.sort((a, b) => lo[a] - lo[b] || hi[a] - hi[b]);
    let ans = 0, run = 0;
    for (let i = 0; i < k; i++) {
      if (i > 0 && lo[ord[i]] === lo[ord[i - 1]] && hi[ord[i]] === hi[ord[i - 1]]) run++;
      else run = 0;
      ans += run;
    }
    print(ans);
  }
}

solve();
printAll();
