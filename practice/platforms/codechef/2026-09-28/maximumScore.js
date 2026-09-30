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
    const n = readInt();
    const a = readIntArray();
    const b = readIntArray();
    let sumA = 0;
    let minLoss = Infinity;

    for (let i = 0; i < n; i++) {
      sumA += a[i];
      const loss = a[i] - b[i];
      if (loss < minLoss) {
        minLoss = loss;
      }
    }

    print(sumA - minLoss);
  }
}

solve();
printAll();
