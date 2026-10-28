const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const l = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let ones = 0;
    let ok = false;
    for (let i = 0; i < l; i++) {
      if (s[i] === '1') ones++;
      if (2 * ones >= i + 1) {
        ok = true;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

