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
    const [n, k] = readIntArray();
    const s = readLine().trim();
    const pref = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + (s[i] === '1' ? 1 : 0);
    const w = n - k + 1;
    let ans = 0;
    for (let j = 0; j < k; j++) if ((pref[j + w] - pref[j]) & 1) ans++;
    print(ans);
  }
}

solve();
printAll();
