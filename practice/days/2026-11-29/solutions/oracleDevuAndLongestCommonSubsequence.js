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
    let ans = Infinity;
    for (let i = 0; i < n; i++) {
      const s = readLine().trim();
      let a = 0;
      for (const c of s) if (c === 'a') a++;
      ans = Math.min(ans, a, s.length - a);
    }
    print(ans);
  }
}

solve();
printAll();
