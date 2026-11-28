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
    let m = BigInt(next());
    const n = BigInt(next());
    if (n > m) { print('NO'); continue; }
    while ((m & 1n) === 0n) m >>= 1n;
    print(n % m === 0n ? 'YES' : 'NO');
  }
}

solve();
printAll();
