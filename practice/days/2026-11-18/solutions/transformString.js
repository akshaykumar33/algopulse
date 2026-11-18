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
    const a = nextWord();
    const b = nextWord();

    let j = b.length - 1;
    const kept = new Uint8Array(a.length);
    for (let i = a.length - 1; i >= 0; i--) {
      if (j >= 0 && a[i] === b[j]) {
        kept[i] = 1;
        j--;
      }
    }

    if (j >= 0) {
      out.push(-1);
      continue;
    }

    let keptCnt = 0;
    let cost = 0n;
    for (let i = 0; i < a.length; i++) {
      if (kept[i]) {
        keptCnt++;
      } else {
        cost += BigInt(keptCnt + 1);
      }
    }

    out.push(cost.toString());
  }

  console.log(out.join('\n'));
}

solve();
