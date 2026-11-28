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
    const k = readInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = readInt();
    a.sort();
    let prev = -1, mx = 0, sum = 0;
    for (let i = 0; i < n; i++) {
      const b = Math.max(a[i], prev + 1);
      const d = b - a[i];
      if (d > mx) mx = d;
      sum += d;
      prev = b;
    }
    print(Math.max(mx, Math.ceil(sum / k)));
  }
}

solve();
printAll();
