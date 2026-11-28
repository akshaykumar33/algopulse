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
  const qs = [];
  let mxN = 3;
  for (let t = 0; t < T; t++) {
    qs.push(readInt());
    if (qs[t] > mxN) mxN = qs[t];
  }
  const lim = Math.floor(mxN / 2) * Math.ceil(mxN / 2);
  const d = new Int32Array(lim + 1);
  for (let i = 1; i <= lim; i++) for (let j = i; j <= lim; j += i) d[j]++;
  const pref = new Float64Array(lim + 1);
  for (let i = 1; i <= lim; i++) pref[i] = pref[i - 1] + d[i];
  for (const n of qs) {
    let ans = 0;
    for (let a = 1; a < n; a++) ans += pref[a * (n - a) - 1];
    print(ans);
  }
}

solve();
printAll();
