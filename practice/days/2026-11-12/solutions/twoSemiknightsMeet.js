const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let r1 = -1;
    let c1 = -1;
    let r2 = -1;
    let c2 = -1;
    for (let r = 0; r < 8; r++) {
      const row = tokens[ptr++];
      for (let c = 0; c < 8; c++) {
        if (row[c] === 'K') {
          if (r1 === -1) {
            r1 = r;
            c1 = c;
          } else {
            r2 = r;
            c2 = c;
          }
        }
      }
    }
    if ((r1 - r2) % 4 === 0 && (c1 - c2) % 4 === 0) out.push('YES');
    else out.push('NO');
  }
  console.log(out.join('\n'));
}

solve();
