const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split(/\s+/).filter(Boolean);
let idx = 0;
const next = () => input[idx++];
const readInt = () => parseInt(next(), 10);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = readInt();
    const pre = new Array(n + 1).fill(false);
    pre[0] = true;
    let cur = 0;
    for (let i = 0; i < n - 1; i++) {
      cur = a[i] - cur;
      pre[i + 1] = pre[i] && cur >= 0;
    }
    const suf = new Array(n + 1).fill(false);
    suf[n - 1] = true;
    cur = 0;
    for (let i = n - 1; i >= 1; i--) {
      cur = a[i] - cur;
      suf[i - 1] = suf[i] && cur >= 0;
    }
    let ans = 0;
    for (let i = 0; i < n; i++) if (pre[i] && suf[i]) ans++;
    print(ans);
  }
}

solve();
printAll();
