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
    if (n % 2 === 0) {
      print(-1);
      continue;
    }
    const res = [];
    for (let i = 1; i <= n; i++) res.push(i % 2 === 1 ? i : n + 1 - i);
    print(res.join(' '));
  }
}

solve();
printAll();
