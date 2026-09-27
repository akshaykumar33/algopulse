const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
let inputIndex = 0;

// Fast input functions
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().split(' ').map(Number);

// Fast output
const output = [];
const print = (val) => output.push(String(val));
const printAll = () => console.log(output.join('\n'));

// Main function
function solve() {
  const T = readInt(); // number of test cases

  for (let t = 0; t < T; t++) {
    const [k, x] = readIntArray();

    // Core logic:
    // smallest n where no valid string exists
    const ans = k * x + 1;

    print(ans);
  }
}

// Execute and output
solve();
printAll();
