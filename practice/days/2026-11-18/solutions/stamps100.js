const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextWord() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('latin1', start, pos);
  }

  const tStr = nextWord();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextWord(), 10);
    const s = nextWord();

    let p = -1;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        p = i;
        break;
      }
    }

    if (p !== -1 && p <= n - 3) {
      let res = '';
      for (let i = 0; i < p; i++) res += '0';
      res += '1';
      for (let i = p + 1; i < n; i++) res += '0';
      out.push(res);
    } else {
      out.push(s);
    }
  }

  console.log(out.join('\n'));
}

solve();
