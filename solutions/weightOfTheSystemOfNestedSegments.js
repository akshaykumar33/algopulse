const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf.charCodeAt(pos) === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf.charCodeAt(pos) >= 48 && buf.charCodeAt(pos) <= 57) {
      res = res * 10 + (buf.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const pts = [];
    for (let i = 1; i <= m; i++) {
      const x = nextInt();
      const w = nextInt();
      pts.push({ id: i, x, w });
    }
    pts.sort((a, b) => a.w - b.w);
    const chosen = pts.slice(0, 2 * n);
    let totalW = 0;
    for (let i = 0; i < 2 * n; i++) totalW += chosen[i].w;
    chosen.sort((a, b) => a.x - b.x);
    out.push(totalW);
    for (let i = 0; i < n; i++) {
      out.push(chosen[i].id + ' ' + chosen[2 * n - 1 - i].id);
    }
    out.push('');
  }
  console.log(out.join('\n').trim());
}

solve();
