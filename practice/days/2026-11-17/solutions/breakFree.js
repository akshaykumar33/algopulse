const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const T = readInt();
  if (T === null) return;
  const MOD = 1000000007n;

  function power(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }
    return res;
  }

  const out = [];
  for (let t = 0; t < T; t++) {
    const n = readInt();
    if (n === null) break;
    let evenCount = 0n;
    let oddCount = 0n;
    for (let i = 0; i < n; i++) {
      const val = readInt();
      if (val % 2 === 0) {
        evenCount++;
      } else {
        oddCount++;
      }
    }
    let ans = power(2n, evenCount);
    if (oddCount === 0n) {
      ans = (ans - 1n + MOD) % MOD;
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
