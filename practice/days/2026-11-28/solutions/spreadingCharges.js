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
    const s = readLine().trim();
    let ans = 0, last = -1;
    for (let i = 0; i <= n; i++) {
      if (i < n && s[i] === '0') continue;
      const len = i - last - 1;
      if (last === -1 && i === n) ans += len;
      else if (last >= 0 && i < n && s[last] !== s[i] && len % 2 === 1) ans++;
      last = i;
    }
    print(ans);
  }
}

solve();
printAll();
