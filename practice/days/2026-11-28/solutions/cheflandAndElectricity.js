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
    const x = readIntArray();
    let ans = 0, last = -1;
    for (let i = 0; i < n; i++) {
      if (s[i] !== '1') continue;
      if (last === -1) ans += x[i] - x[0];
      else {
        let mx = 0;
        for (let j = last; j < i; j++) mx = Math.max(mx, x[j + 1] - x[j]);
        ans += x[i] - x[last] - mx;
      }
      last = i;
    }
    ans += x[n - 1] - x[last];
    print(ans);
  }
}

solve();
printAll();
