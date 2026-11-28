const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function ok(s, a, la, b, lb) {
  let i = a, j = b, skip = 0;
  while (i < a + la && j < b + lb) {
    if (s.charCodeAt(i) === s.charCodeAt(j)) {
      i++;
      j++;
    } else {
      i++;
      skip++;
      if (skip > 1) return false;
    }
  }
  return j === b + lb;
}

function solve() {
  const d = readInt();
  for (let t = 0; t < d; t++) {
    const s = readLine().trim();
    const n = s.length;
    let res = false;
    if (n % 2 === 0) {
      const h = n / 2;
      res = s.slice(0, h) === s.slice(h);
    } else if (n > 1) {
      const h = (n - 1) / 2;
      res = ok(s, 0, h + 1, h + 1, h) || ok(s, h, h + 1, 0, h);
    }
    print(res ? 'YES' : 'NO');
  }
}

solve();
printAll();
