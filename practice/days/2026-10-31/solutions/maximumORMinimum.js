const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let c0 = 0;
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (v === 1) c1++;
      else c0++;
    }

    out.push(c1 >= c0 ? 1 : 0);
  }

  console.log(out.join('\n'));
}

solve();
