const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function isBalanced(arr) {
  let bal = 0;
  for (const c of arr) {
    if (c === '0') bal++;
    else bal--;
    if (bal < 0) return false;
  }
  return bal === 0;
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const s = readLine().trim();
    if (isBalanced(s)) { print(0); continue; }
    let c0 = 0, c1 = 0;
    for (const c of s) { if (c === '0') c0++; else c1++; }
    if (c0 === c1) { print(2); continue; }
    if (c0 > c1) {
      const del = c0 - c1;
      let rem = del;
      const kept = [];
      for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '0' && rem > 0) rem--;
        else kept.push(s[i]);
      }
      kept.reverse();
      print(isBalanced(kept) ? 1 : 2);
    } else {
      const del = c1 - c0;
      let rem = del;
      const kept = [];
      for (let i = 0; i < s.length; i++) {
        if (s[i] === '1' && rem > 0) rem--;
        else kept.push(s[i]);
      }
      print(isBalanced(kept) ? 1 : 2);
    }
  }
}

solve();
printAll();
