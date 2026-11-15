const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

    let ans = 0n;
    let cap = BigInt(a[n - 1]);
    for (let i = n - 2; i >= 0; i--) {
      const val = BigInt(a[i]);
      if (val <= cap) {
        cap = val;
      } else {
        const k = (val + cap - 1n) / cap;
        ans += k - 1n;
        cap = val / k;
      }
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
