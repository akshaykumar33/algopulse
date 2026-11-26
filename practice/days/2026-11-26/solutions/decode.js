'use strict';
const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextToken() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('ascii', start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  let t = parseInt(tStr, 10);
  const MOD = 1000000007;
  const out = [];

  while (t--) {
    const s = nextToken();
    const n = s.length;
    const offset = n;
    const sumVal = new Int32Array(2 * n + 5);
    sumVal[offset] = 1;
    let pref = 0;
    let ans = 0;

    for (let j = 1; j <= n; j++) {
      pref += s.charCodeAt(j - 1) === 49 ? 1 : -1;
      const prev = sumVal[pref + offset];
      if (prev > 0) {
        ans = (ans + (n - j + 1) * prev) % MOD;
      }
      sumVal[pref + offset] = (sumVal[pref + offset] + j + 1) % MOD;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
