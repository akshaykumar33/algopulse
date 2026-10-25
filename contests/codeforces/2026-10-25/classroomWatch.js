const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;

  const n = parseInt(raw, 10);
  const start = Math.max(1, n - 100);
  const res = [];

  for (let x = start; x <= n; x++) {
    let s = 0;
    let tmp = x;
    while (tmp > 0) {
      s += tmp % 10;
      tmp = Math.floor(tmp / 10);
    }
    if (x + s === n) {
      res.push(x);
    }
  }

  const out = [res.length];
  for (let i = 0; i < res.length; i++) {
    out.push(res[i]);
  }
  console.log(out.join('\n'));
}

solve();
