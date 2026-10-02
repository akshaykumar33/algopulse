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

    let boys = 0;
    let girls = 0;
    let entered = 0;

    for (let i = 0; i < n; i++) {
      entered++;
      if (s[i] === 'B') boys++;
      else girls++;

      if (boys > 2 * girls) {
        break;
      }
    }

    out.push(entered);
  }

  console.log(out.join('\n'));
}

solve();
