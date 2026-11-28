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
    const c = readIntArray();
    const z = [], o = [];
    for (let i = 0; i < n; i++) (i % 2 === 0 ? z : o).push(c[i]);
    z.sort((x, y) => y - x);
    o.sort((x, y) => x - y);
    const res = [];
    let zeros = 0, ans = 0;
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        res.push(z[i >> 1]);
        zeros += z[i >> 1];
      } else {
        res.push(o[i >> 1]);
        ans += zeros * o[i >> 1];
      }
    }
    print(res.join(' '));
    print(ans);
  }
}

solve();
printAll();
