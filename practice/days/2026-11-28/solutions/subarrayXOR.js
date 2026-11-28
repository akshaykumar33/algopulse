const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const MOD = 998244353;

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const s = readLine().trim();
    const pref = new Uint8Array(n + 1);
    for (let i = 0; i < n; i++) pref[i + 1] = pref[i] ^ (s[i] === '1' ? (i + 1) & 1 : 0);
    let ans = 0, pw = 1;
    for (let k = 0; k < n; k++) {
      if (pref[n - k]) ans = (ans + pw) % MOD;
      pw = pw * 2 % MOD;
    }
    print(ans);
  }
}

solve();
printAll();
