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

  const qStr = nextWord();
  if (!qStr) return;
  const q = parseInt(qStr, 10);
  const out = [];

  for (let query = 0; query < q; query++) {
    const n = parseInt(nextWord(), 10);
    const row0 = nextWord();
    const row1 = nextWord();

    let r = 0;
    let ok = true;

    for (let c = 0; c < n; c++) {
      const cur = r === 0 ? row0.charCodeAt(c) - 48 : row1.charCodeAt(c) - 48;
      if (cur > 2) {
        const other = r === 0 ? row1.charCodeAt(c) - 48 : row0.charCodeAt(c) - 48;
        if (other <= 2) {
          ok = false;
          break;
        }
        r = 1 - r;
      }
    }

    if (ok && r === 1) out.push('YES');
    else out.push('NO');
  }

  console.log(out.join('\n'));
}

solve();
