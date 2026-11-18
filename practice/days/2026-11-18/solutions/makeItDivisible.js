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
  let c1 = 0, c2 = 0;
  for (let i = 0; i < n; i++) {
    let rem = a[i] % 3;
    if (rem === 1) c1++;
    else if (rem === 2) c2++;
  }

  let m = Math.min(c1, c2);
  c1 -= m;
  c2 -= m;

  let rem = c1 + c2;
  if (rem % 3 === 0) {
    return m + Math.floor(rem / 3) * 2;
  }
  return -1;
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
