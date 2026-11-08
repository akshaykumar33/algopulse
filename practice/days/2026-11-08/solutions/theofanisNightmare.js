const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = BigInt(input[ptr++]);
    }

    let suff = 0n;
    let ans = 0n;
    for (let i = n - 1; i >= 0; i--) {
      suff += a[i];
      if (i === 0 || suff > 0n) {
        ans += suff;
      }
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
