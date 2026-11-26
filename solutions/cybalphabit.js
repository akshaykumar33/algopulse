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
    if (k < n || k > n * (1 << 25)) { print('-1'); continue; }
    let rem = k - n;
    const res = new Array(n).fill('a');
    for (let pos = n - 1; pos >= 0 && rem > 0; pos--) {
      for (let c = 25; c >= 1; c--) {
        const gain = (1 << c) - 1;
        if (rem >= gain) {
          res[pos] = String.fromCharCode(97 + c);
          rem -= gain;
          break;
        }
      }
    }
    if (rem !== 0) print('-1');
    else print(res.join(''));
  }
}

solve();
printAll();
