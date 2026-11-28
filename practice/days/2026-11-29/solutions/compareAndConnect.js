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
    let res;
    if (n === 0) res = '>' + '<>'.repeat(m - 2) + '=>';
    else if (m === 0) res = '<'.repeat(2 * n - 3) + '=<';
    else res = '<'.repeat(2 * n) + '>' + '<>'.repeat(m - 1);
    print(res);
  }
}

solve();
printAll();
