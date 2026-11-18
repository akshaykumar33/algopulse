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
    const k = parseInt(nextWord(), 10);
    const s = nextWord();

    let c0 = 0;
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') c0++;
      else c1++;
    }

    if (c0 < k || c1 < k) {
      out.push(s);
      continue;
    }

    if (n === 2 * k) {
      let flipped = '';
      for (let i = 0; i < n; i++) {
        flipped += s[i] === '0' ? '1' : '0';
      }
      out.push(s < flipped ? s : flipped);
      continue;
    }

    out.push('0'.repeat(c0) + '1'.repeat(c1));
  }

  console.log(out.join('\n'));
}

solve();
