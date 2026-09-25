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
  const T = readInt(); 

  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = readIntArray();

    // Original total time
    let total = 0;
    for (let i = 0; i < n - 1; i++) {
      total += Math.abs(a[i] - a[i + 1]);
    }

    let ans = total;

    // Remove first element
    ans = Math.min(ans, total - Math.abs(a[0] - a[1]));

    // Remove last element
    ans = Math.min(ans, total - Math.abs(a[n - 2] - a[n - 1]));

    // Remove one middle element
    for (let i = 1; i < n - 1; i++) {
      const cur =
        total
        - Math.abs(a[i - 1] - a[i])
        - Math.abs(a[i] - a[i + 1])
        + Math.abs(a[i - 1] - a[i + 1]);

      ans = Math.min(ans, cur);
    }

    print(ans);
  }
}

// Execute and output
solve();
printAll();
