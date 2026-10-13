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

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const k = parseInt(nextToken(), 10);
    const s = nextToken();

    if (k === n) {
      out.push('-'.repeat(n));
      continue;
    }

    let c0 = 0;
    let c1 = 0;
    let c2 = 0;
    for (let i = 0; i < k; i++) {
      const ch = s.charCodeAt(i);
      if (ch === 48) c0++;
      else if (ch === 49) c1++;
      else c2++;
    }

    const minTop = c0;
    const maxTop = c0 + c2;
    const minBot = c1;
    const rem = n - k;

    const keptL = maxTop + 1;
    const keptR = minTop + rem;

    const res = [];
    for (let i = 1; i <= n; i++) {
      if (i <= minTop || i > n - minBot) {
        res.push('-');
      } else if (keptL <= keptR && i >= keptL && i <= keptR) {
        res.push('+');
      } else {
        res.push('?');
      }
    }
    out.push(res.join(''));
  }

  console.log(out.join('\n'));
}

solve();
