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
    const [n, q] = readIntArray();
    for (let i = 1; i < n; i++) print(i + " " + (i + 1));
    let cur = n - 1;
    for (let i = 0; i < q; i++) {
      const d = readInt();
      if (d === cur) print("-1 -1 -1");
      else { print(n + " " + cur + " " + d); cur = d; }
    }
  }
}

solve();
printAll();
