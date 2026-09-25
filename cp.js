const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

// Fast input functions
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const readStringArray = () => readLine().trim().split(/\s+/);
const readBigInt = () => BigInt(readLine().trim());
const readBigIntArray = () => readLine().trim().split(/\s+/).map(BigInt);

// Fast output
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

// Common utilities
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
};

// Main function
function solve() {
  // Example usage of input functions
  const T = readInt(); // Read number of test cases
  for (let t = 0; t < T; t++) {
    const [n, m] = readIntArray(); // Read two integers
    // Your solution logic here
    print(n + m); // Output result
  }
}

// Execute and output
solve();
printAll();

//node filename.js < input.txt > output.txt