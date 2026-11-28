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
    const [n, k] = readIntArray();
    const s = readLine().trim();
    let cur = 0;
    for (let i = 0; i + 1 < k; i++) if (s[i] !== s[i + 1]) cur++;
    let ans = cur + (s[k - 1] === '0' ? 1 : 0);
    for (let r = k; r < n; r++) {
      if (s[r - 1] !== s[r]) cur++;
      if (s[r - k] !== s[r - k + 1]) cur--;
      const v = cur + (s[r] === '0' ? 1 : 0);
      if (v < ans) ans = v;
    }
    print(ans);
  }
}

solve();
printAll();
