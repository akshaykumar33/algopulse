const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split(/\s+/).filter(Boolean);
let idx = 0;
const next = () => input[idx++];
const readInt = () => parseInt(next(), 10);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const MX = 1100000;
  const spf = new Int32Array(MX + 1);
  const primes = [];
  for (let i = 2; i <= MX; i++) {
    if (spf[i] === 0) { primes.push(i); for (let j = i; j <= MX; j += i) if (spf[j] === 0) spf[j] = i; }
  }
  const mark = new Int32Array(MX + 1);
  const T = readInt();
  for (let t = 1; t <= T; t++) {
    const n = readInt();
    for (let i = 0; i < n; i++) {
      let x = readInt();
      while (x > 1) { const p = spf[x]; mark[p] = t; while (x % p === 0) x /= p; }
    }
    let k = 0;
    while (mark[primes[k]] === t) k++;
    print(primes[k]);
  }
}

solve();
printAll();
