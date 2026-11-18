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
  let isValley = new Uint8Array(n);
  for (let i = 1; i < n - 1; i++) {
    if (a[i] < a[i - 1] && a[i] < a[i + 1]) {
      isValley[i] = 1;
    }
  }

  let total = 0n;
  for (let i = 0; i < n; i++) {
    let val = a[i];
    if (i > 0 && isValley[i - 1]) val = Math.min(val, a[i - 1]);
    if (i < n - 1 && isValley[i + 1]) val = Math.min(val, a[i + 1]);
    total += BigInt(val);
  }

  return total.toString();
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
