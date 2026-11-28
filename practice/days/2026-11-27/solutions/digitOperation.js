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
    const k = BigInt(next());
    const a = [];
    for (let i = 0; i < n; i++) a.push(next());
    const ca = new Array(10).fill(0), cb = new Array(10).fill(0);
    let ok = true;
    for (let i = 0; i < n; i++) {
      const b = next();
      if (b.length !== a[i].length) ok = false;
      for (let j = 0; j < a[i].length; j++) ca[a[i].charCodeAt(j) - 48]++;
      for (let j = 0; j < b.length; j++) cb[b.charCodeAt(j) - 48]++;
    }
    let cost = 0;
    for (let d = 0; d < 10; d++) if (cb[d] > ca[d]) cost += cb[d] - ca[d];
    print(ok && BigInt(cost) <= k ? 'YES' : 'NO');
  }
}

solve();
printAll();
