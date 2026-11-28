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
    const n = readInt();
    const s = readLine().trim();
    let c1 = 0;
    for (let i = 0; i < n; i++) if (s[i] === '1') c1++;
    const m = Math.min(c1, n - c1);
    let alice;
    if (n === 1) alice = false;
    else if (n % 2 === 0) alice = m !== n / 2;
    else alice = m === (n - 1) / 2;
    print(alice ? 'Alice' : 'Bob');
  }
}

solve();
printAll();
