const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let unique = true;
    for (let i = 0; i <= Math.floor((n - 1) / 2); i++) {
      const j = n - 1 - i;
      if (s[i] === '?' && s[j] === '?') {
        unique = false;
        break;
      }
    }
    out.push(unique ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
