const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const MOD = 1000000007;
  const C = Array.from({ length: 1005 }, () => new Int32Array(1005));
  for (let i = 0; i <= 1000; i++) {
    C[i][0] = 1;
    for (let j = 1; j <= i; j++) {
      C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();
    a.reverse();
    const target = a[k - 1];
    let total = 0, need = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] === target) total++;
    }
    for (let i = 0; i < k; i++) {
      if (a[i] === target) need++;
    }
    out.push(C[total][need]);
  }
  console.log(out.join('\n'));
}

solve();
