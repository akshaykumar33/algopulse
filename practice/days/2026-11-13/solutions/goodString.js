const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  const cnt = new Int32Array(10);
  const dp = new Int32Array(100);

  for (let tc = 0; tc < t; tc++) {
    const s = nextToken();
    if (!s) break;

    cnt.fill(0);
    dp.fill(0);

    const n = s.length;
    for (let i = 0; i < n; i++) {
      const c = s.charCodeAt(i) - 48;
      cnt[c]++;
      for (let x = 0; x < 10; x++) {
        if (x !== c) {
          const idx1 = x * 10 + c;
          if ((dp[idx1] & 1) === 1) {
            dp[idx1]++;
          }
          const idx2 = c * 10 + x;
          if ((dp[idx2] & 1) === 0) {
            dp[idx2]++;
          }
        }
      }
    }

    let maxLen = 0;
    for (let i = 0; i < 10; i++) {
      if (cnt[i] > maxLen) maxLen = cnt[i];
    }

    for (let a = 0; a < 10; a++) {
      for (let b = 0; b < 10; b++) {
        if (a !== b) {
          let len = dp[a * 10 + b];
          if ((len & 1) === 1) {
            len--;
          }
          if (len > maxLen) {
            maxLen = len;
          }
        }
      }
    }

    out.push(n - maxLen);
  }

  console.log(out.join('\n'));
}

solve();
