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
  const [n, k] = readIntArray();
  const a = readIntArray().sort((x, y) => x - y);
  let cur = k, ans = 0;
  for (const x of a) {
    while (2 * cur < x) { cur *= 2; ans++; }
    cur = Math.max(cur, x);
  }
  print(ans);
}

solve();
printAll();
