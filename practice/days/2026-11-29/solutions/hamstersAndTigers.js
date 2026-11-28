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
  const s = readLine().trim();
  let h = 0;
  for (const ch of s) if (ch === "H") h++;
  let cur = 0;
  for (let i = 0; i < h; i++) if (s[i] === "T") cur++;
  let ans = cur;
  for (let i = 1; i < n; i++) {
    if (s[i - 1] === "T") cur--;
    if (s[(i + h - 1) % n] === "T") cur++;
    ans = Math.min(ans, cur);
  }
  print(ans);
}

solve();
printAll();
