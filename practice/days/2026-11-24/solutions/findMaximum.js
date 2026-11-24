const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextToken() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('utf8', start, pos);
  }
  const nStr = nextToken();
  if (!nStr) return;
  const n = parseInt(nStr, 10);
  const a = new Int32Array(n);
  const pref = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(nextToken(), 10);
    pref[i + 1] = pref[i] + a[i];
  }
  const s = nextToken();
  let suffSum = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === '1') suffSum += a[i];
  }
  let ans = suffSum;
  let curSuff = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === '1') {
      const cand = curSuff + pref[i];
      if (cand > ans) ans = cand;
      curSuff += a[i];
    }
  }
  console.log(ans);
}

solve();
