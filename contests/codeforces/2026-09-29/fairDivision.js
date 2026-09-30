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
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = readIntArray();
    let c1 = 0, c2 = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] === 1) c1++;
      else c2++;
    }
    const sum = c1 + 2 * c2;
    if (sum % 2 !== 0) {
      print('NO');
    } else if (c2 % 2 === 1 && c1 < 2) {
      print('NO');
    } else {
      print('YES');
    }
  }
}

solve();
printAll();
