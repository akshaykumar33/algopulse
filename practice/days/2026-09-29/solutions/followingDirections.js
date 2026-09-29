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
    const n = readInt();
    const s = readLine().trim();
    let x = 0, y = 0;
    let found = false;
    for (let i = 0; i < n; i++) {
      const c = s[i];
      if (c === 'U') y++;
      else if (c === 'D') y--;
      else if (c === 'R') x++;
      else if (c === 'L') x--;
      if (x === 1 && y === 1) {
        found = true;
      }
    }
    print(found ? 'YES' : 'NO');
  }
}

solve();
printAll();
