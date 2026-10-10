const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  const len = input.length;

  function nextToken() {
    while (pos < len && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= len) return null;
    const start = pos;
    while (pos < len && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const k = parseInt(nextToken(), 10);
    const s = nextToken();

    let cur = 0;
    for (let i = 0; i < k; i++) {
      if (s[i] === 'W') cur++;
    }

    let ans = cur;
    for (let i = k; i < n; i++) {
      if (s[i] === 'W') cur++;
      if (s[i - k] === 'W') cur--;
      if (cur < ans) ans = cur;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
