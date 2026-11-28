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
  let total = 0;
  for (const ch of s) if (ch === "G") total++;
  const l = new Int32Array(n), r = new Int32Array(n);
  for (let i = 0; i < n; i++) l[i] = s[i] === "G" ? (i ? l[i - 1] : 0) + 1 : 0;
  for (let i = n - 1; i >= 0; i--) r[i] = s[i] === "G" ? (i < n - 1 ? r[i + 1] : 0) + 1 : 0;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === "G") ans = Math.max(ans, l[i]);
    else {
      const left = i ? l[i - 1] : 0, right = i < n - 1 ? r[i + 1] : 0;
      ans = Math.max(ans, Math.min(left + right + 1, total));
    }
  }
  print(ans);
}

solve();
printAll();
