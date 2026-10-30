const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let ok = true;
    for (let i = 1; i <= n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      if (!ok) continue;
      let found = false;
      const limit = i + 1;
      for (let j = 2; j <= limit; j++) {
        if (val % j !== 0) {
          found = true;
          break;
        }
      }
      if (!found) ok = false;
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
