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
    const [n, d] = readIntArray();
    const a = readIntArray();
    const b = readIntArray();
    let sa = 0, sb = 0, sm = 0;
    for (let i = 0; i < n; i++) {
      sa += a[i];
      sb += b[i];
      sm += Math.min(a[i], b[i]);
    }
    print(Math.min(sa + d, sb + d, sm + 2 * d));
  }
}

solve();
printAll();
