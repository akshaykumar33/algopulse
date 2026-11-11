const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  let cap = 200005;
  let rem = new Int32Array(cap);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    if (n > cap) {
      cap = n;
      rem = new Int32Array(cap);
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      const r = v % k;
      ans += (v - r) / k;
      rem[i] = r;
    }
    const sub = rem.subarray(0, n);
    sub.sort();
    let l = 0;
    let r = n - 1;
    while (l < r) {
      if (sub[l] + sub[r] >= k) {
        ans++;
        l++;
        r--;
      } else {
        l++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
