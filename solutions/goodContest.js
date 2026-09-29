const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

// Fast input functions
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

// Fast output
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

// Main function
function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const [a1, a2, a3] = readIntArray();
    const ans = n - Math.min(a1, a2, a3);
    print(ans);
  }
}

// Execute and output
solve();
printAll();
