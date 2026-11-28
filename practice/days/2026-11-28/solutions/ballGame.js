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
    const b = readIntArray();
    const idx = new Array(n);
    for (let i = 0; i < n; i++) idx[i] = i;
    idx.sort((x, y) => a[x] - a[y]);
    const less = (i, j) => BigInt(a[i]) * BigInt(b[j]) < BigInt(a[j]) * BigInt(b[i]);
    const st = [];
    for (const i of idx) {
      while (st.length && less(i, st[st.length - 1])) st.pop();
      st.push(i);
    }
    print(st.length);
  }
}

solve();
printAll();
