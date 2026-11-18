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

  const fibSet = new Set();
  let f0 = 0n;
  let f1 = 1n;
  fibSet.add('0');
  fibSet.add('1');

  while (true) {
    const f2 = f0 + f1;
    const s = f2.toString();
    fibSet.add(s);
    if (s.length > 1005) break;
    f0 = f1;
    f1 = f2;
  }

  const tStr = nextWord();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = nextWord();
    if (fibSet.has(a)) out.push('YES');
    else out.push('NO');
  }

  console.log(out.join('\n'));
}

solve();
