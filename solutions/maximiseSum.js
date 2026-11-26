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
    if (n === 1) { print(a[0]); continue; }
    const pre = new Array(n);
    const suf = new Array(n);
    pre[0] = a[0];
    for (let i = 1; i < n; i++) pre[i] = Math.max(pre[i-1], a[i]);
    suf[n-1] = a[n-1];
    for (let i = n-2; i >= 0; i--) suf[i] = Math.max(suf[i+1], a[i]);
    let ans = a[0] + a[n-1];
    for (let i = 1; i < n-1; i++) {
      ans += Math.min(pre[i-1], suf[i+1]);
    }
    print(ans);
  }
}

solve();
printAll();
