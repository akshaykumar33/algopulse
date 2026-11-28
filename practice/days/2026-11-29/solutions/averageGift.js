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
    const [n, x] = readIntArray();
    const s = readIntArray();
    let lo = false, hi = false, eq = false;
    for (let i = 0; i < n; i++) {
      if (s[i] < x) lo = true;
      else if (s[i] > x) hi = true;
      else eq = true;
    }
    print(eq || (lo && hi) ? 'YES' : 'NO');
  }
}

solve();
printAll();
