const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

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
  const a = new Int32Array(500005);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let g = 0;
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      a[i] = v;
      g = gcd(g, v);
    }
    const res = new Array(n);
    for (let i = 0; i < n; i++) res[i] = a[i] / g;
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
