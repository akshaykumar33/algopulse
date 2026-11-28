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
    let x = 0, first = true;
    for (let i = n - 1; i >= 0; i--) {
      const p = (a >> i) & 1, q = (b >> i) & 1;
      if (p === q) {
        if (p === 0) x |= 1 << i;
      } else if (first) {
        first = false;
        if (p === 0) x |= 1 << i;
      } else if (q === 0) {
        x |= 1 << i;
      }
    }
    print(x >>> 0);
  }
}

solve();
printAll();
