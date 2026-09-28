const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  let [a, b] = readIntArray();
  let years = 0;
  while (a <= b) {
    a *= 3;
    b *= 2;
    years++;
  }
  print(years);
}

solve();
printAll();
