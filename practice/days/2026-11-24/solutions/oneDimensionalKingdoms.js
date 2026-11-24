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
    const intervals = [];
    for (let i = 0; i < n; i++) {
      const l = nextInt();
      const r = nextInt();
      intervals.push([l, r]);
    }
    intervals.sort((a, b) => a[1] - b[1]);
    let bombs = 0;
    let lastBomb = -1;
    for (let i = 0; i < n; i++) {
      if (intervals[i][0] > lastBomb) {
        bombs++;
        lastBomb = intervals[i][1];
      }
    }
    out.push(bombs);
  }
  console.log(out.join('\n'));
}

solve();
