const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const idx = s.indexOf('W');
    const l = idx;
    const r = s.length - 1 - idx;
    if (l === r) {
      out.push('Chef');
    } else {
      out.push('Aleksa');
    }
  }

  console.log(out.join('\n'));
}

solve();
