const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  const cnt = new Int32Array(n + 1);

  for (let i = 0; i < n; i++) {
    const v = parseInt(tokens[ptr++], 10);
    if (v < 1 || v > n) {
      console.log(-1);
      return;
    }
    a[i] = v;
    cnt[v]++;
  }

  for (let v = 2; v <= n; v++) {
    if (cnt[v] > cnt[v - 1]) {
      console.log(-1);
      return;
    }
  }

  const k = cnt[1];
  const cur = new Int32Array(n + 1);
  const res = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = ++cur[a[i]];
  }

  console.log(k + '\n' + res.join(' '));
}

solve();
