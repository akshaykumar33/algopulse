const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);

    if (a === 1) {
      out.push((n - 1) % b === 0 ? 'Yes' : 'No');
      continue;
    }

    let cur = 1;
    let ok = false;
    while (cur <= n) {
      if ((n - cur) % b === 0) {
        ok = true;
        break;
      }
      cur *= a;
    }

    out.push(ok ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
