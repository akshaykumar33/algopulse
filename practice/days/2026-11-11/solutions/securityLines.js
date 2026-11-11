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
    let ans = parseInt(tokens[ptr++], 10);
    for (let i = 1; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10) + 1;
      const cand = i > v ? i : v;
      if (cand < ans) ans = cand;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
