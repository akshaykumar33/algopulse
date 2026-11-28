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
  const n = readInt();
  const s = readLine();
  const lens = [];
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "." || s[i] === "?" || s[i] === "!") {
      lens.push(i - start + 1);
      start = i + 2;
    }
  }
  let ans = 0, cur = -1;
  for (const l of lens) {
    if (l > n) { print("Impossible"); return; }
    if (cur === -1 || cur + 1 + l > n) { ans++; cur = l; }
    else cur += 1 + l;
  }
  print(ans);
}

solve();
printAll();
