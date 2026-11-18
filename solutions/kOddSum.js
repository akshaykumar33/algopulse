const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function build(n, k) {
  let odds = [], evens = [];
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 1) odds.push(i);
    else evens.push(i);
  }
  let res = [];
  let numOddBlocks = Math.ceil((k + 1) / 2);
  let numEvenBlocks = Math.floor((k + 1) / 2);

  let oIdx = 0, eIdx = 0;
  for (let b = 0; b < k + 1; b++) {
    if (b % 2 === 0) {
      let count = (Math.floor(b / 2) === numOddBlocks - 1) ? (odds.length - oIdx) : 1;
      for (let j = 0; j < count; j++) res.push(odds[oIdx++]);
    } else {
      let count = (Math.floor(b / 2) === numEvenBlocks - 1) ? (evens.length - eIdx) : 1;
      for (let j = 0; j < count; j++) res.push(evens[eIdx++]);
    }
  }
  return res;
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, k] = readIntArray();
    const res = build(n, k);
    print(res.join(' '));
  }
}

solve();
printAll();
