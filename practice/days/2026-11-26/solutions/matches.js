const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function wins(a, b) {
  if (a === 0) return false;
  if (a === b) return true;
  if (a < b) return wins(b, a);
  if (a % b === 0) return true;
  if (Math.floor(a / b) >= 2) return true;
  return !wins(b, a % b);
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [a, b] = readIntArray();
    print(wins(a, b) ? 'Ari' : 'Rich');
  }
}

solve();
printAll();
