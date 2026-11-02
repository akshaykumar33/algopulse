const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let start = pos;
    while (pos < buf.length && buf.charCodeAt(pos) > 32) pos++;
    return parseInt(buf.slice(start, pos), 10);
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;
    let ok = true;
    for (let i = 1; i <= n; i++) {
      const b = nextInt();
      if (i % b !== 0) {
        ok = false;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
