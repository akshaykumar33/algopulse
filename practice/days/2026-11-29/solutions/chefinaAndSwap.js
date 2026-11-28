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
    const N = BigInt(n);
    const tot = N * (N + 1n);
    if (tot % 4n !== 0n) {
      print(0);
      continue;
    }
    const half2 = tot / 2n;
    let m = Math.floor((Math.sqrt(2 * n * (n + 1) + 1) - 1) / 2);
    while (BigInt(m + 1) * BigInt(m + 2) <= half2) m++;
    while (BigInt(m) * BigInt(m + 1) > half2) m--;
    let ans = 0;
    let big = 0n;
    let M = m;
    let d = Number((half2 - BigInt(m) * BigInt(m + 1)) / 2n);
    if (d === 0) {
      const a = BigInt(m), b = BigInt(n - m);
      big = a * (a - 1n) / 2n + b * (b - 1n) / 2n;
      d += M;
      M--;
    }
    while (M >= 1 && d <= n - 1) {
      const lo = Math.max(1, M + 1 - d), hi = Math.min(M, n - d);
      if (hi >= lo) ans += hi - lo + 1;
      d += M;
      M--;
    }
    print((big + BigInt(ans)).toString());
  }
}

solve();
printAll();
