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
  const [n, k] = readIntArray();
  const both = [], al = [], bo = [];
  for (let i = 0; i < n; i++) {
    const [t, a, b] = readIntArray();
    if (a && b) both.push(t);
    else if (a) al.push(t);
    else if (b) bo.push(t);
  }
  both.sort((x, y) => x - y);
  al.sort((x, y) => x - y);
  bo.sort((x, y) => x - y);
  const pre = (v) => { const p = [0]; for (const x of v) p.push(p[p.length - 1] + x); return p; };
  const p11 = pre(both), p10 = pre(al), p01 = pre(bo);
  let ans = Infinity;
  for (let i = 0; i <= Math.min(k, both.length); i++) {
    const need = k - i;
    if (need > al.length || need > bo.length) continue;
    ans = Math.min(ans, p11[i] + p10[need] + p01[need]);
  }
  print(ans === Infinity ? -1 : ans);
}

solve();
printAll();
