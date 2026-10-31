const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n + 1);
    const pref = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
      pref[i] = pref[i - 1] + a[i];
    }

    let l = 1, r = n;
    while (l < r) {
      const mid = (l + r) >> 1;
      const count = mid - l + 1;
      const expected = pref[mid] - pref[l - 1];
      const actual = ptr < tokens.length ? parseInt(tokens[ptr++], 10) : expected;
      if (actual > expected) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    out.push(`! ${l}`);
  }

  console.log(out.join('\n'));
}

solve();

