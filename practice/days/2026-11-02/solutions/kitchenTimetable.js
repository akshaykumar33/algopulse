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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
    }
    let ans = 0;
    let prev = 0;
    for (let i = 0; i < n; i++) {
      const b = nextInt();
      const time = a[i] - prev;
      if (b <= time) {
        ans++;
      }
      prev = a[i];
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

