const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  const len = buf.length;
  let ptr = 0;

  function nextInt() {
    while (ptr < len && buf.charCodeAt(ptr) <= 32) ptr++;
    let res = 0;
    while (ptr < len) {
      const c = buf.charCodeAt(ptr);
      if (c <= 32) break;
      res = res * 10 + (c - 48);
      ptr++;
    }
    return res;
  }

  while (ptr < len && buf.charCodeAt(ptr) <= 32) ptr++;
  if (ptr >= len) return;

  const t = nextInt();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const r = new Int32Array(n);
    for (let i = 0; i < n; i++) r[i] = nextInt() % k;
    r.sort();
    let ans = r[n - 1] - r[0];
    for (let i = 0; i < n - 1; i++) {
      const cur = r[i] + k - r[i + 1];
      if (cur < ans) ans = cur;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
