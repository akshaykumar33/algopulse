const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(input[ptr++], 10);
    let p = -1;
    let q = -1;
    for (let b = 30; b >= 0; b--) {
      if ((x & (1 << b)) !== 0) {
        if (p === -1) p = b;
        else if (q === -1) { q = b; break; }
      }
    }
    if (q === -1) {
      out.push(1);
      continue;
    }
    let cnt = 0;
    for (let b = q - 1; b >= 0; b--) {
      if ((x & (1 << b)) === 0) cnt++;
    }
    out.push(1 << cnt);
  }
  console.log(out.join('\n'));
}

solve();
