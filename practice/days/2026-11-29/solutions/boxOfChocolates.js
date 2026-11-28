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
    const w = readIntArray();
    let mx = 0;
    for (let i = 0; i < n; i++) if (w[i] > mx) mx = w[i];
    const pref = new Int32Array(2 * n + 1);
    for (let i = 0; i < 2 * n; i++) pref[i + 1] = pref[i] + (w[i % n] === mx ? 1 : 0);
    const h = n / 2;
    let ans = 0;
    for (let s = 0; s < n; s++) if (pref[s + h] - pref[s] === 0) ans++;
    print(ans);
  }
}

solve();
printAll();
