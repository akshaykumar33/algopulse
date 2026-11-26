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
    const [n, a, b] = readIntArray();
    const period = a + b;
    const limit = period + 10;
    const wA = new Array(limit + 1).fill(false);
    const wB = new Array(limit + 1).fill(false);
    for (let i = 1; i <= limit; i++) {
      for (let take = 1; take <= Math.min(a, i); take++) {
        if (!wB[i - take]) { wA[i] = true; break; }
      }
      for (let take = 1; take <= Math.min(b, i); take++) {
        if (!wA[i - take]) { wB[i] = true; break; }
      }
    }
    const r = n % period;
    const idx = r === 0 ? period : r;
    print(wA[idx] ? 'Alice' : 'Bob');
  }
}

solve();
printAll();
