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
    const p = readIntArray();
    let start = 0, ans = 0;
    for (let i = 0; i < n; i++) {
      if (i >= 2 && p[i - 2] < p[i - 1] && p[i - 1] > p[i]) start = i - 1;
      ans += i - start + 1;
    }
    print(ans);
  }
}

solve();
printAll();
