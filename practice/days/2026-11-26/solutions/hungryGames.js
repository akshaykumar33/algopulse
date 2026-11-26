'use strict';
const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  let t = tVal;
  const out = [];

  while (t--) {
    const n = nextInt();
    const x = nextInt();
    const pref = new Float64Array(n + 1);
    for (let i = 1; i <= n; i++) {
      pref[i] = pref[i - 1] + nextInt();
    }

    const dp = new Int32Array(n + 2);
    let zeroCount = 0;

    for (let i = n; i >= 1; i--) {
      const target = pref[i - 1] + x;
      let low = i;
      let high = n;
      let p = n + 1;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (pref[mid] > target) {
          p = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }

      if (p <= n) {
        dp[i] = 1 + dp[p + 1];
      } else {
        dp[i] = 0;
      }
      zeroCount += dp[i];
    }

    const total = (n * (n + 1)) / 2;
    out.push(total - zeroCount);
  }

  console.log(out.join('\n'));
}

solve();
