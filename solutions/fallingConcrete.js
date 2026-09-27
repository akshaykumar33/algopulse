const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let inputIndex = 0;

const readInt = () => parseInt(input[inputIndex++], 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const c = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const a = readInt();
      c[i] = a - (i + 1);
    }

    c.sort();

    let maxLen = 1;
    let curLen = 1;

    for (let i = 1; i < n; i++) {
      if (c[i] === c[i - 1]) {
        continue;
      } else if (c[i] === c[i - 1] + 1) {
        curLen++;
        if (curLen > maxLen) {
          maxLen = curLen;
        }
      } else {
        curLen = 1;
      }
    }

    print(maxLen);
  }
}

solve();
printAll();
