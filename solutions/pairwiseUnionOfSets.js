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

  const t = nextInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();

    let full = 0;
    const other = [];

    for (let i = 0; i < n; i++) {
      const len = nextInt();
      const s = new Int32Array(len);
      for (let j = 0; j < len; j++) s[j] = nextInt();
      if (len === k) {
        full++;
      } else if (len > 0) {
        other.push(s);
      }
    }

    let ans = (full * (full - 1)) / 2 + full * other.length;
    other.sort((a, b) => b.length - a.length);

    const m = other.length;
    const inA = new Uint8Array(k + 1);

    for (let i = 0; i < m; i++) {
      const a = other[i];
      if (a.length * 2 < k) break;
      for (let x = 0; x < a.length; x++) inA[a[x]] = 1;

      for (let j = i + 1; j < m; j++) {
        const b = other[j];
        if (a.length + b.length < k) break;
        const needCap = a.length + b.length - k;
        let cap = 0;
        for (let x = 0; x < b.length; x++) {
          if (inA[b[x]]) cap++;
        }
        if (cap === needCap) ans++;
      }

      for (let x = 0; x < a.length; x++) inA[a[x]] = 0;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
