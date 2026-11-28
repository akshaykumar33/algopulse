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
    const [n, m] = readIntArray();
    const x = Int32Array.from(readIntArray()).sort();
    const a = x[0] - 1, b = n - x[m - 1];
    let g = 0;
    for (let i = 0; i + 1 < m; i++) g = Math.max(g, x[i + 1] - x[i] - 1);
    const r1 = Math.max(b, g - a);
    const l2 = Math.max(a, g - b);
    const ans = Math.min(a + r1 + Math.min(a, r1), l2 + b + Math.min(l2, b));
    print(ans);
  }
}

solve();
printAll();
