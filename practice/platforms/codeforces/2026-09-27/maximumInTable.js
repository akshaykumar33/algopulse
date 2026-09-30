const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const n = readInt();
  const table = Array.from({ length: n }, () => new Array(n).fill(1));
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      table[i][j] = table[i - 1][j] + table[i][j - 1];
    }
  }
  print(table[n - 1][n - 1]);
}

solve();
printAll();
