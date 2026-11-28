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
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, k] = readIntArray();
    const s = readLine().trim();
    let ans = 0;
    for (let q = 0; q + 1 < n; q++) {
      if (s[q] === s[q + 1]) continue;
      const lo = Math.max(0, q - k + 1), hi = Math.min(q, n - k - 1);
      if (hi >= lo) ans += hi - lo + 1;
    }
    print(ans);
  }
}

solve();
printAll();
