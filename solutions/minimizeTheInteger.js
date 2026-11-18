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
    const s = nextWord();
    const evens = [];
    const odds = [];

    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if ((c.charCodeAt(0) - 48) % 2 === 0) evens.push(c);
      else odds.push(c);
    }

    let p1 = 0, p2 = 0;
    const merged = [];

    while (p1 < evens.length && p2 < odds.length) {
      if (evens[p1] < odds[p2]) {
        merged.push(evens[p1++]);
      } else {
        merged.push(odds[p2++]);
      }
    }

    while (p1 < evens.length) merged.push(evens[p1++]);
    while (p2 < odds.length) merged.push(odds[p2++]);

    out.push(merged.join(''));
  }

  console.log(out.join('\n'));
}

solve();
