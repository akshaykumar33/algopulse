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

  const kStr = nextToken();
  if (!kStr) return;
  const k = parseInt(kStr, 10);
  const s = nextToken();
  if (!s) return;

  const n = s.length;
  const cnt = new Int32Array(n + 1);
  cnt[0] = 1;
  let cur = 0;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    if (s.charCodeAt(i) === 49) cur++;
    if (cur >= k) ans += cnt[cur - k];
    cnt[cur]++;
  }

  console.log(ans);
}

solve();
