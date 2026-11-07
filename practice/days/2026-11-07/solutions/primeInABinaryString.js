const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let hasOneBeforeEnd = false;
    for (let i = 0; i < s.length - 1; i++) {
      if (s[i] === '1') {
        hasOneBeforeEnd = true;
        break;
      }
    }
    out.push(hasOneBeforeEnd ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
