const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

// Fast input functions
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readBigIntArray = () => readLine().trim().split(/\s+/).map(BigInt);

// Fast output
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const abs = (x) => (x < 0n ? -x : x);
const max = (x, y) => (x > y ? x : y);

// Main function
function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [a, b, c] = readBigIntArray();
    const opt1 = abs(a - b);
    const opt2 = abs(a + c - b);
    const ans = max(opt1, opt2);
    print(ans.toString());
  }
}

// Execute and output
solve();
printAll();