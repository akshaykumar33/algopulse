const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

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
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const raw = new Int32Array(n);
    for (let i = 0; i < n; i++) raw[i] = nextInt();
    raw.sort();
    const u = [];
    for (let i = 0; i < n; i++) {
      if (i === 0 || raw[i] !== raw[i - 1]) u.push(raw[i]);
    }
    const m = u.length;
    if (m === 1) {
      out.push(u[0] * 2);
      continue;
    }
    if (m === 2) {
      out.push(u[0] + u[1]);
      continue;
    }
    const pref = new Int32Array(m);
    const suff = new Int32Array(m);
    pref[0] = u[0];
    for (let i = 1; i < m; i++) pref[i] = gcd(pref[i - 1], u[i]);
    suff[m - 1] = u[m - 1];
    for (let i = m - 2; i >= 0; i--) suff[i] = gcd(suff[i + 1], u[i]);
    let ans = 0;
    for (let i = 0; i < m; i++) {
      let otherGcd = 0;
      if (i === 0) otherGcd = suff[1];
      else if (i === m - 1) otherGcd = pref[m - 2];
      else otherGcd = gcd(pref[i - 1], suff[i + 1]);
      const total = u[i] + otherGcd;
      if (total > ans) ans = total;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
