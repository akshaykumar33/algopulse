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
    const s = readLine().trim();
    const bad = [];
    for (let i = 0; i + 1 < n; i++) if (s[i] === s[i + 1]) bad.push(i);
    if (bad.length === 0) {
      print('Yes');
      continue;
    }
    if (bad.length > 2) {
      print('No');
      continue;
    }
    const ls = [0], rs = [n - 1];
    for (const b of bad) {
      ls.push(b + 1);
      rs.push(b);
    }
    let ok = false;
    for (const l of ls) {
      for (const r of rs) {
        if (l > r) continue;
        let cnt = bad.length;
        if (l > 0) cnt += (s[l - 1] === s[r] ? 1 : 0) - (s[l - 1] === s[l] ? 1 : 0);
        if (r < n - 1) cnt += (s[l] === s[r + 1] ? 1 : 0) - (s[r] === s[r + 1] ? 1 : 0);
        if (cnt === 0) ok = true;
      }
    }
    print(ok ? 'Yes' : 'No');
  }
}

solve();
printAll();
