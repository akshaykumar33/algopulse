const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const a = new Int32Array(k);
    for (let i = 0; i < k; i++) a[i] = nextInt();
    const p = [];
    let prev = 0;
    for (let i = 0; i < k; i++) {
      const cur = a[i];
      for (let v = cur; v > prev; v--) {
        p.push(v);
      }
      prev = cur;
    }
    out.push(p.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
