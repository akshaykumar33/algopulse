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

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [a, b, c] = readIntArray();

    let maxProduct = 0;
    // Distribute 5 increments among a, b, c to maximize (a + i) * (b + j) * (c + k)
    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 5 - i; j++) {
        const k = 5 - i - j;
        const prod = (a + i) * (b + j) * (c + k);
        if (prod > maxProduct) {
          maxProduct = prod;
        }
      }
    }

    print(maxProduct);
  }
}

solve();
printAll();
