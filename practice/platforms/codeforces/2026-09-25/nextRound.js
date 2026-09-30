const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;


const readLine = () => input[inputIndex++];
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);


const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));


function solve() {
  const [n, k] = readIntArray();
  const a = readIntArray();
  const cutoff = a[k - 1];
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] > 0 && a[i] >= cutoff) count++;
  }
  print(count);
}


solve();
printAll();
