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
  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];
  const target = ['C', 'H', 'E', 'F'];
  for (let tc = 0; tc < t; tc++) {
    const s = nextToken().split('');
    const m = s.length;
    for (let i = m - 4; i >= 0; i--) {
      let ok = true;
      for (let j = 0; j < 4; j++) {
        if (s[i + j] !== '?' && s[i + j] !== target[j]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        for (let j = 0; j < 4; j++) {
          s[i + j] = target[j];
        }
        i -= 3;
      }
    }
    for (let i = 0; i < m; i++) {
      if (s[i] === '?') s[i] = 'A';
    }
    out.push(s.join(''));
  }
  console.log(out.join('\n'));
}

solve();
