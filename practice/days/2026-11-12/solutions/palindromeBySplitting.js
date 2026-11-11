const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);

    let l = 0;
    let r = n - 1;
    let lv = a[0];
    let rv = a[n - 1];
    let ans = 0;

    while (l < r) {
      if (lv === rv) {
        l++;
        r--;
        lv = a[l];
        rv = a[r];
      } else if (lv < rv) {
        rv -= lv;
        l++;
        lv = a[l];
        ans++;
      } else {
        lv -= rv;
        r--;
        rv = a[r];
        ans++;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
