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
    const c = [], w = [];
    for (let i = 0; i < n; i++) {
      const [x, y] = readIntArray();
      c.push(x);
      w.push(y);
    }
    let ans = 0;
    for (let m = 0; m < 1 << n; m++) {
      let cost = 0, wt = 0;
      for (let i = 0; i < n; i++) {
        if (m >> i & 1) {
          cost += c[i];
          wt += w[i];
        }
      }
      if (cost <= k && wt > ans) ans = wt;
    }
    print(ans);
  }
}

solve();
printAll();
