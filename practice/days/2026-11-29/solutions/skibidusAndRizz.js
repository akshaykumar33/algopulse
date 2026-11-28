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
  const t = readInt();
  for (let tc = 0; tc < t; tc++) {
    const [n, m, k] = readIntArray();
    const a = Math.max(n, m), b = Math.min(n, m);
    if (k < a - b || k > a) { print(-1); continue; }
    const mx = n >= m ? "0" : "1", mn = n >= m ? "1" : "0";
    print(mx.repeat(k) + (mn + mx).repeat(a - k) + mn.repeat(b - (a - k)));
  }
}

solve();
printAll();
