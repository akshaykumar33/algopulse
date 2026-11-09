const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    if (k === 1) {
      out.push('1');
    } else if (2 * k > n) {
      out.push('-1');
    } else {
      const res = [];
      for (let i = 1; i <= k; i++) {
        res.push(2 * i);
      }
      out.push(res.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
