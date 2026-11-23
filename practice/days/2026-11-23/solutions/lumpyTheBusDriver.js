const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let p = parseInt(input[ptr++], 10);
    let q = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }
    a.sort((x, y) => x - y);
    let ans = 0;
    for (let i = 0; i < n; i++) {
      const need = a[i];
      const takeTwos = Math.min(q, Math.floor(need / 2));
      const rem = need - 2 * takeTwos;
      if (p >= rem) {
        p -= rem;
        q -= takeTwos;
        ans++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
