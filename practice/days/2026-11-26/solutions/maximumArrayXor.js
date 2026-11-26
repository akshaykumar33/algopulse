const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, k] = readIntArray();
    const half = BigInt(1) << BigInt(n - 1);
    const full = (BigInt(1) << BigInt(n)) - BigInt(1);
    const swaps = BigInt(k) < half ? BigInt(k) : half;
    const ans = BigInt(2) * swaps * full;
    print(ans.toString());
  }
}

solve();
printAll();
