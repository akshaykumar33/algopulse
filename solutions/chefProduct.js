const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readBigInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0n;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10n + BigInt(buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const T_val = readBigInt();
  if (T_val === null) return;
  const T = Number(T_val);
  const out = [];

  function isqrt(n) {
    if (n <= 0n) return 0n;
    let low = 1n;
    let high = 1000000000n;
    let ans = 1n;
    while (low <= high) {
      const mid = (low + high) / 2n;
      if (mid * mid <= n) {
        ans = mid;
        low = mid + 1n;
      } else {
        high = mid - 1n;
      }
    }
    return ans;
  }

  for (let t = 0; t < T; t++) {
    const n = readBigInt();
    if (n === null) break;
    const m = isqrt(n);
    let count = 0n;
    if (n % 2n === 0n) {
      count = m / 2n;
    } else {
      count = (m + 1n) / 2n;
    }
    out.push(count.toString());
  }

  console.log(out.join('\n'));
}

solve();
