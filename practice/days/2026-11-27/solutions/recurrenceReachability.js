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
    const m = readInt();
    if (m < n) { print(m + ' ' + (m + 1)); continue; }
    if (m === n) { print((m - 1) + ' ' + m); continue; }
    let res = '-1';
    for (let p = 3; p < m && res === '-1'; p = p * 2 + 1) {
      for (let d = 1; d < n && d * p < m; d++) {
        const x = m - d * p;
        if (x + d <= n) { res = x + ' ' + (x + d); break; }
      }
    }
    print(res);
  }
}

solve();
printAll();
