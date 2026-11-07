const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let a = BigInt(tokens[ptr++]);
    let b = BigInt(tokens[ptr++]);
    const r = BigInt(tokens[ptr++]);

    if (a < b) {
      const tmp = a; a = b; b = tmp;
    }

    let first = true;
    let x = 0n;

    for (let bit = 61n; bit >= 0n; bit--) {
      const bitA = (a >> bit) & 1n;
      const bitB = (b >> bit) & 1n;

      if (bitA !== bitB) {
        if (first) {
          first = false;
        } else if (bitA === 1n && bitB === 0n) {
          if ((x | (1n << bit)) <= r) {
            x |= (1n << bit);
          }
        }
      }
    }

    const valA = a ^ x;
    const valB = b ^ x;
    const diff = valA > valB ? valA - valB : valB - valA;
    out.push(diff.toString());
  }

  console.log(out.join('\n'));
}

solve();
