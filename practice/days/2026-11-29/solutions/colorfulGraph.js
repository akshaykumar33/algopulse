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
  const [n, m] = readIntArray();
  const c = readIntArray();
  const st = new Map();
  for (const x of c) if (!st.has(x)) st.set(x, new Set());
  for (let i = 0; i < m; i++) {
    const [u, v] = readIntArray();
    const a = c[u - 1], b = c[v - 1];
    if (a !== b) { st.get(a).add(b); st.get(b).add(a); }
  }
  let ans = -1, best = -1;
  for (const [col, s] of st) {
    if (s.size > best || (s.size === best && col < ans)) { best = s.size; ans = col; }
  }
  print(ans);
}

solve();
printAll();
