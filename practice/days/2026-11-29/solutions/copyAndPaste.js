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
    const [n, m] = readIntArray();
    const s = readLine().trim();
    const cnt = new Int32Array(n + 1);
    let p = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') p++;
      cnt[p]++;
    }
    if (p === 0) {
      print(n * m);
      continue;
    }
    const total = p * m;
    if (total % 2) {
      print(0);
      continue;
    }
    const half = total / 2;
    let ans = 0;
    for (let j = 0; j < m; j++) {
      const v = half - j * p;
      if (v >= 0 && v <= p) ans += cnt[v];
    }
    print(ans);
  }
}

solve();
printAll();
