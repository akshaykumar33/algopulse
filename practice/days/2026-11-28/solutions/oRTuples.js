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
  const cnt = new Array(8).fill(0);
  for (let m = 0; m < 8; m++) {
    const a = m & 1, b = (m >> 1) & 1, c = (m >> 2) & 1;
    cnt[(a | b) | ((b | c) << 1) | ((c | a) << 2)]++;
  }
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [p, q, r] = readIntArray();
    let ans = 1;
    for (let i = 0; i < 20 && ans; i++) {
      ans *= cnt[((p >> i) & 1) | (((q >> i) & 1) << 1) | (((r >> i) & 1) << 2)];
    }
    print(ans);
  }
}

solve();
printAll();
