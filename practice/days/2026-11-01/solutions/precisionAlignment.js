const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = BigInt(tokens[ptr++]);

    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(BigInt(tokens[ptr++]));
    }
    a.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

    let low = a[0];
    let high = a[n - 1] + k;
    let ans = high;

    while (low <= high) {
      const mid = (low + high) / 2n;
      let req = 0n;
      for (let i = 0; i < n; i++) {
        if (a[i] < mid) {
          req += (mid - a[i]);
        }
      }
      if (req <= k) {
        ans = mid;
        low = mid + 1n;
      } else {
        high = mid - 1n;
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
