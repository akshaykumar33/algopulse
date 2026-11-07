const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const res = [];

    if (n % 2 === 1) {
      const k = (n - 1) / 2;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (j - i <= k) res.push(1);
          else res.push(-1);
        }
      }
    } else {
      const k = n / 2;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (j - i < k) res.push(1);
          else if (j - i === k) res.push(0);
          else res.push(-1);
        }
      }
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
