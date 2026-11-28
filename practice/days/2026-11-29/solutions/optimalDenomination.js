const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const gcd = (a, b) => {
  while (b) [a, b] = [b, a % b];
  return a;
};

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = readIntArray();
    if (n === 1) {
      print(1);
      continue;
    }
    const pre = new Array(n + 1).fill(0), suf = new Array(n + 2).fill(0);
    let sum = 0;
    for (let i = 0; i < n; i++) {
      pre[i + 1] = gcd(pre[i], a[i]);
      sum += a[i];
    }
    for (let i = n - 1; i >= 0; i--) suf[i] = gcd(suf[i + 1], a[i]);
    let ans = Infinity;
    for (let i = 0; i < n; i++) {
      const g = gcd(pre[i], suf[i + 1]);
      const v = (sum - a[i]) / g + 1;
      if (v < ans) ans = v;
    }
    print(ans);
  }
}

solve();
printAll();
