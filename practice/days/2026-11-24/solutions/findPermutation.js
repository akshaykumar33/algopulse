const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const total = 2 * n;
    const firstPos = new Int32Array(n + 1).fill(-1);
    const seen = [];
    for (let i = 0; i < total; i++) {
      const v = nextInt();
      if (firstPos[v] === -1) {
        firstPos[v] = i;
        seen.push(v);
      }
    }
    out.push(seen.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
