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
    const a = readIntArray();
    a.sort((x, y) => y - x);
    let first = 0;
    for (let i = 0; i < 2 * k; i += 2) first += a[i];
    let second = 0;
    for (let i = 1; i <= 2 * k; i += 2) second += a[i];
    second += a[2 * k];
    print(Math.max(first, second));
  }
}

solve();
printAll();
