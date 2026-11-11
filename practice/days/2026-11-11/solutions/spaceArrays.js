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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();
    let ok = true;
    let parity = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] > i + 1) {
        ok = false;
        break;
      }
      parity ^= (i + 1 - a[i]) & 1;
    }
    out.push(ok && parity === 1 ? 'First' : 'Second');
  }
  console.log(out.join('\n'));
}

solve();
