const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let mn = Infinity;
    let ok = true;
    for (let i = 0; i < n; i++) {
      const b = parseInt(tokens[ptr++], 10);
      if (mn < Math.floor(b / 2) + 1) {
        ok = false;
      }
      if (b < mn) mn = b;
    }
    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

