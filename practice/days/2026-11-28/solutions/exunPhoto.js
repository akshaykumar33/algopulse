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
    const p = readIntArray();
    const bit = new Int32Array(n + 1);
    let ans = 0, bad = false;
    for (let i = 0; i < n; i++) {
      let c = 0;
      for (let j = p[i] - 1; j > 0; j -= j & -j) c += bit[j];
      for (let j = p[i]; j <= n; j += j & -j) bit[j]++;
      if (c === 0) continue;
      if (k === 1) bad = true;
      else ans += Math.ceil(c / (k - 1));
    }
    print(bad ? -1 : ans);
  }
}

solve();
printAll();
