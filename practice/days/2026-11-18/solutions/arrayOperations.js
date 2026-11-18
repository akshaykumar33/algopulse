const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solveCase(n, a) {
  let ma = -Infinity;
  for (let i = 0; i < n; i++) {
    if (a[i] > ma) ma = a[i];
  }

  let foundOnEven = false;
  for (let i = 0; i < n; i += 2) {
    if (a[i] === ma) {
      foundOnEven = true;
      break;
    }
  }

  let ops = Math.floor((n - 1) / 2);
  if (foundOnEven) return ma + ops;
  return ma + ops - 1;
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = readIntArray();
    print(solveCase(n, a));
  }
}

solve();
printAll();
