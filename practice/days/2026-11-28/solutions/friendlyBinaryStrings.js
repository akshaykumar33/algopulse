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
    const a = readLine().trim();
    const b = readLine().trim();
    const cnt = [0, 0, 0];
    for (let i = 0; i < n; i++) cnt[(a[i] === '1' ? 1 : 0) + (b[i] === '1' ? 1 : 0)]++;
    const odd = (cnt[0] & 1) + (cnt[1] & 1) + (cnt[2] & 1);
    print(odd <= n % 2 ? 'YES' : 'NO');
  }
}

solve();
printAll();
