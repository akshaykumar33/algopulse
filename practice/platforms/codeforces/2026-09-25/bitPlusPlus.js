const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

// Fast input functions
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

// Fast output
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

// Main function
function solve() {
  const n = readInt();
  let x = 0;
  for (let i = 0; i < n; i++) {
    x += readLine().includes('+') ? 1 : -1;
  }
  print(x);
}

// Execute and output
solve();
printAll();
