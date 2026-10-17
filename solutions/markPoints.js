const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
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
    const s = nextToken();

    let curLen = 0;
    let ok = true;

    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        curLen++;
      } else {
        if (curLen > 0 && curLen < 3) {
          ok = false;
          break;
        }
        curLen = 0;
      }
    }

    if (curLen > 0 && curLen < 3) {
      ok = false;
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
