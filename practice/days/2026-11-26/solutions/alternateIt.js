const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function isAlternating(s) {
  for (let i = 1; i < s.length; i++) if (s[i] === s[i-1]) return false;
  return true;
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const s = readLine().trim();
    const n = s.length;
    if (isAlternating(s)) { print(0); continue; }
    let c0 = 0, c1 = 0;
    for (const c of s) { if (c === '0') c0++; else c1++; }
    const diff = Math.abs(c0 - c1);
    if (diff <= 1) { print(1); continue; }
    print(2);
  }
}

solve();
printAll();
