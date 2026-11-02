const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const res = [];
    let l = 1, r = n;
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        res.push(r--);
      } else {
        res.push(l++);
      }
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

