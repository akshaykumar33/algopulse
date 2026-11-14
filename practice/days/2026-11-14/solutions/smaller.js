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
    const q = parseInt(nextToken(), 10);
    let sLen = 1n, tLen = 1n;
    let sHasOther = false, tHasOther = false;

    for (let qi = 0; qi < q; qi++) {
      const d = parseInt(nextToken(), 10);
      const k = BigInt(nextToken());
      const x = nextToken();

      for (let i = 0; i < x.length; i++) {
        if (x[i] !== 'a') {
          if (d === 1) sHasOther = true;
          else tHasOther = true;
        }
      }

      if (d === 1) sLen += k * BigInt(x.length);
      else tLen += k * BigInt(x.length);

      if (tHasOther) {
        out.push('YES');
      } else if (!sHasOther && sLen < tLen) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
