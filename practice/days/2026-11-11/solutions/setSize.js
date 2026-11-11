const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  const len = buf.length;
  let ptr = 0;

  function nextInt() {
    while (ptr < len && buf.charCodeAt(ptr) <= 32) ptr++;
    if (ptr >= len) return 0;
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

  const n = nextInt();
  const q = nextInt();
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  a.sort();

  const m = n - 1;
  const d = new Int32Array(m);
  for (let i = 0; i < m; i++) d[i] = a[i + 1] - a[i];
  d.sort();

  const pref = new Float64Array(m + 1);
  for (let i = 0; i < m; i++) pref[i + 1] = pref[i] + d[i];

  const out = new Array(q);
  for (let i = 0; i < q; i++) {
    const x = nextInt();
    let lo = 0;
    let hi = m;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (d[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    out[i] = (n - lo) * x + pref[lo];
  }

  console.log(out.join('\n'));
}

solve();
