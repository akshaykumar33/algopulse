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
    const diff = new Int32Array(n + 2);
    let add = 0, ans = 0;
    for (let i = 0; i < n; i++) {
      add += diff[i];
      const x = Math.min(a[i] + add, n - 1 - i);
      ans += x;
      if (x > 0) {
        diff[i + 1]++;
        diff[i + 1 + x]--;
      }
    }
    print(ans);
  }
}

solve();
printAll();
