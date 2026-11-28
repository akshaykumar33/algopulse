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
    const a = readIntArray();
    let seen = new Set();
    let ans = 0;
    for (let i = 0; i < n; i++) {
      if (seen.has(a[i])) {
        ans++;
        seen = new Set();
      }
      seen.add(a[i]);
    }
    print(ans);
  }
}

solve();
printAll();
