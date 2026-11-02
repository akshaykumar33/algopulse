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
    let t1 = 0;
    let t2 = 0;
    for (let i = 0; i < 10; i++) {
      const s = nextInt();
      if (i % 2 === 0) {
        t1 += s;
      } else {
        t2 += s;
      }
    }
    if (t1 > t2) out.push('1');
    else if (t2 > t1) out.push('2');
    else out.push('0');
  }

  console.log(out.join('\n'));
}

solve();

