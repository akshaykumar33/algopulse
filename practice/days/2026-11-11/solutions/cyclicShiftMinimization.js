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
    const res = [];
    for (let i = n; i >= 1; i--) {
      res.push(i);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
