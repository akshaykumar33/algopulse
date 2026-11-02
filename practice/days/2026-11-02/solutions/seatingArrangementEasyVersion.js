const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf.charCodeAt(pos) > 32) pos++;
    return buf.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const x = parseInt(nextToken(), 10);
    const s = parseInt(nextToken(), 10);
    const str = nextToken();
    if (!str) break;

    const maxU = Math.min(x, n);
    let dp = new Int32Array(maxU + 1).fill(-1);
    dp[0] = 0;

    for (let i = 0; i < n; i++) {
      const ch = str[i];
      const nextDp = new Int32Array(dp);

      for (let u = 0; u <= maxU; u++) {
        const p = dp[u];
        if (p === -1) continue;

        if (ch === 'E') {
          if (p < u * s && p + 1 > nextDp[u]) {
            nextDp[u] = p + 1;
          }
        } else if (ch === 'I') {
          if (u + 1 <= maxU && p + 1 > nextDp[u + 1]) {
            nextDp[u + 1] = p + 1;
          }
        } else if (ch === 'A') {
          if (p < u * s && p + 1 > nextDp[u]) {
            nextDp[u] = p + 1;
          }
          if (u + 1 <= maxU && p + 1 > nextDp[u + 1]) {
            nextDp[u + 1] = p + 1;
          }
        }
      }

      dp = nextDp;
    }

    let ans = 0;
    for (let u = 0; u <= maxU; u++) {
      if (dp[u] > ans) ans = dp[u];
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
