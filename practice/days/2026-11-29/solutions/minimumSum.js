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
    const cnt = new Array(31).fill(0);
    for (let i = 0; i < n; i++) {
      const v = a[i];
      for (let b = 0; b < 31; b++) if ((v >> b) & 1) cnt[b]++;
    }
    let ans = 0;
    for (let b = 0; b < 31; b++) ans += Math.min(cnt[b], n - cnt[b]) * 2 ** b;
    print(ans);
  }
}

solve();
printAll();
