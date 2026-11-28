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
  let [n, k, m, t] = readIntArray();
  let l = n;
  for (let i = 0; i < t; i++) {
    const [op, x] = readIntArray();
    if (op === 1) {
      if (x <= k) k++;
      l++;
    } else if (k <= x) l = x;
    else { l -= x; k -= x; }
    print(l + " " + k);
  }
}

solve();
printAll();
