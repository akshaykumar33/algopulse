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
  const n = readInt();
  const a = readIntArray();
  let minVal = a[0];
  let maxVal = a[0];
  let amazing = 0;

  for (let i = 1; i < n; i++) {
    if (a[i] > maxVal) {
      amazing++;
      maxVal = a[i];
    } else if (a[i] < minVal) {
      amazing++;
      minVal = a[i];
    }
  }

  print(amazing);
}

solve();
printAll();
