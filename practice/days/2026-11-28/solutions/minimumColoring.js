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
    const [x1, y1] = readIntArray();
    const [x2, y2] = readIntArray();
    const p = (x1 + y1) & 1;
    const diff = ((x2 + y2) & 1) !== p;
    for (let i = 1; i <= n; i++) {
      const row = new Array(m);
      for (let j = 1; j <= m; j++) {
        if (((i + j) & 1) === p) row[j - 1] = 1;
        else row[j - 1] = diff ? 2 : 3;
      }
      if (i === x2) row[y2 - 1] = 2;
      print(row.join(' '));
    }
  }
}

solve();
printAll();
