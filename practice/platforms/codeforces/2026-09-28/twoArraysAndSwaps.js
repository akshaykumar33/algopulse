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
    const a = readIntArray().sort((x, y) => x - y);
    const b = readIntArray().sort((x, y) => y - x);

    for (let i = 0; i < Math.min(k, n); i++) {
      if (b[i] > a[i]) {
        a[i] = b[i];
      } else {
        break;
      }
    }

    const sum = a.reduce((acc, v) => acc + v, 0);
    print(sum);
  }
}

solve();
printAll();
