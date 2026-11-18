const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solveCase(n) {
  print(n);
  for (let r = 1; r <= n; r++) {
    print(n);
    for (let j = 1; j <= n; j++) {
      let x = (j + r - 2) % n + 1;
      let y = (j + r - 1) % n + 1;
      print(`${j} ${x} ${y}`);
    }
  }
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    solveCase(n);
  }
}

solve();
printAll();
