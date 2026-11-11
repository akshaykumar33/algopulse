const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const cnt = new Int32Array(1000001);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      a[i] = v;
      cnt[v]++;
    }

    let same = 0;
    for (let i = 0; i < n; i++) {
      const v = a[i];
      const c = cnt[v];
      if (c > 0) {
        same += c * (c - 1);
        cnt[v] = 0;
      }
    }

    out.push(n * (n - 1) - same);
  }

  console.log(out.join('\n'));
}

solve();
