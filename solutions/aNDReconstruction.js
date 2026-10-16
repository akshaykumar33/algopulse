const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
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
    const b = new Int32Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
      b[i] = nextInt();
    }
    const a = new Int32Array(n);
    a[0] = b[0];
    a[n - 1] = b[n - 2];
    for (let i = 1; i < n - 1; i++) {
      a[i] = b[i - 1] | b[i];
    }
    let ok = true;
    for (let i = 0; i < n - 1; i++) {
      if ((a[i] & a[i + 1]) !== b[i]) {
        ok = false;
        break;
      }
    }
    if (ok) {
      out.push(a.join(' '));
    } else {
      out.push('-1');
    }
  }

  console.log(out.join('\n'));
}

solve();
