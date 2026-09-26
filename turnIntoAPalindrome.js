const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextToken() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    const start = offset;
    while (offset < buffer.length && buffer[offset] > 32) {
      offset++;
    }
    return buffer.toString('utf-8', start, offset);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const nStr = nextToken();
    const c = nextToken();
    const s = nextToken();
    if (!nStr || !c || !s) break;
    const n = parseInt(nStr, 10);

    let ans = 0;
    const half = Math.floor(n / 2);
    for (let i = 0; i < half; i++) {
      const u = s[i];
      const v = s[n - 1 - i];
      if (u === v) {
        continue;
      } else if (u === c || v === c) {
        ans += 1;
      } else {
        ans += 2;
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
