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
  const n = readInt();
  const l = new Int32Array(n), key = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const [x, y] = readIntArray();
    l[i] = x;
    key[i] = y * 1048576 + i;
  }
  key.sort();
  let ans = 0, last = -1;
  for (let i = 0; i < n; i++) {
    const id = key[i] % 1048576, r = (key[i] - id) / 1048576;
    if (l[id] > last) { ans++; last = r; }
  }
  print(ans);
}

solve();
printAll();
