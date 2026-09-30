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
  const w = readInt();
  print(w > 2 && w % 2 === 0 ? 'YES' : 'NO');
}

// Execute and output
solve();
printAll();
