const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    const cnt = new Int32Array(n + 2);
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[pos++], 10);
      if (v <= n + 1) cnt[v]++;
    }

    const res = [];
    let missing = 0;
    for (let k = 0; k <= n; k++) {
      if (k > 0) {
        if (cnt[k - 1] === 0) missing++;
      }
      const val = cnt[k] > missing ? cnt[k] : missing;
      res.push(val);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
