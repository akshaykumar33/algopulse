const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  const len = buf.length;
  let ptr = 0;

  function nextInt() {
    while (ptr < len && buf.charCodeAt(ptr) <= 32) ptr++;
    let sign = 1;
    if (ptr < len && buf.charCodeAt(ptr) === 45) {
      sign = -1;
      ptr++;
    }
    let res = 0;
    while (ptr < len) {
      const c = buf.charCodeAt(ptr);
      if (c <= 32) break;
      res = res * 10 + (c - 48);
      ptr++;
    }
    return res * sign;
  }

  while (ptr < len && buf.charCodeAt(ptr) <= 32) ptr++;
  if (ptr >= len) return;

  const n = nextInt();
  const q = nextInt();
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  a.sort();

  const out = new Array(q);
  for (let i = 0; i < q; i++) {
    const x = nextInt();
    let lo = 0;
    let hi = n;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (a[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo < n && a[lo] === x) {
      out[i] = '0';
    } else {
      out[i] = (n - lo) & 1 ? 'NEGATIVE' : 'POSITIVE';
    }
  }

  console.log(out.join('\n'));
}

solve();
