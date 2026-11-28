const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const s = readLine().trim();
    let o1 = 0, oz = 0, e1 = 0, ez = 0;
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        if (s[i] === '1') o1++;
        else oz++;
      } else {
        if (s[i] === '1') e1++;
        else ez++;
      }
    }
    const a = Math.min(oz, e1), b = Math.min(ez, o1);
    let ans;
    if (n % 2 === 1) ans = Math.min(a + b, (n - 1) / 2);
    else ans = Math.max(Math.min(a, n / 2), Math.min(a + b, n / 2 - 1));
    print(ans);
  }
}

solve();
printAll();
