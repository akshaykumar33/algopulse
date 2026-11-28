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
  const p = readIntArray();
  const d = readIntArray();
  const par = Array.from({ length: n }, (_, i) => i);
  const find = (x) => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
  for (let i = 0; i < n; i++) {
    for (const j of [i - d[i], i + d[i]]) if (j >= 0 && j < n) par[find(i)] = find(j);
  }
  for (let i = 0; i < n; i++) if (find(i) !== find(p[i] - 1)) { print("NO"); return; }
  print("YES");
}

solve();
printAll();
