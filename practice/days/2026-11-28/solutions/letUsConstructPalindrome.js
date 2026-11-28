const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const isPal = (s, l, r) => {
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
};

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const s = readLine().trim();
    let l = 0, r = s.length - 1, ok = true;
    while (l < r) {
      if (s[l] !== s[r]) {
        ok = isPal(s, l + 1, r) || isPal(s, l, r - 1);
        break;
      }
      l++;
      r--;
    }
    print(ok ? 'YES' : 'NO');
  }
}

solve();
printAll();
