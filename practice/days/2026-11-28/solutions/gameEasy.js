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
    const n = readInt();
    const a = readIntArray().sort((x, y) => y - x);
    const top = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) top[i + 1] = top[i] + a[i];
    const res = [];
    for (let k = 1; k <= 2 * n; k++) {
      let best = 0;
      for (let m = 1; m <= Math.min(n, k); m++) {
        const j = Math.min(m, k - m);
        const v = top[m] + j * m - j * (j + 1) / 2;
        if (v > best) best = v;
      }
      res.push(best);
    }
    print(res.join(' '));
  }
}

solve();
printAll();
