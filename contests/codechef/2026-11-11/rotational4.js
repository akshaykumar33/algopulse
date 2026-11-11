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
    let ans = 0;
    for (let i = 0; i < n; i++) {
      const v = (s.charCodeAt(i) - 48) * 10 + s.charCodeAt((i + 1) % n) - 48;
      if (v % 4 === 0) ans++;
    }
    print(ans);
  }
}

solve();
printAll();
