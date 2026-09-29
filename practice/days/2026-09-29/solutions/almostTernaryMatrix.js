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
    for (let i = 0; i < n; i++) {
      const row = [];
      const r = (i % 4 === 1 || i % 4 === 2);
      for (let j = 0; j < m; j++) {
        const c = (j % 4 === 1 || j % 4 === 2);
        row.push(r === c ? 1 : 0);
      }
      print(row.join(' '));
    }
  }
}

solve();
printAll();
