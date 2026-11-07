const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);

    if (x < n) {
      out.push(-1);
      continue;
    }

    const val = x - n + 1;
    const res = [val];
    for (let i = 1; i <= n; i++) {
      if (i !== val) res.push(i);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
