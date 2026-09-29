const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const s = readLine().trim();
    let bal = 0;
    let canUnbalance = false;
    for (let i = 0; i < s.length - 1; i++) {
      bal += (s[i] === '(' ? 1 : -1);
      if (bal === 0) {
        canUnbalance = true;
        break;
      }
    }
    print(canUnbalance ? 'YES' : 'NO');
  }
}

solve();
printAll();
