const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  const TARGET = 'ADVITIYA';
  for (let t = 0; t < T; t++) {
    const s = readLine().trim();
    let ops = 0;
    for (let i = 0; i < 8; i++) {
      const diff = (TARGET.charCodeAt(i) - s.charCodeAt(i) + 26) % 26;
      ops += diff;
    }
    print(ops);
  }
}

solve();
printAll();
