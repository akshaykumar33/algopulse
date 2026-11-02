const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const L = BigInt(tokens[ptr++]);
    const D = BigInt(tokens[ptr++]);
    const S = BigInt(tokens[ptr++]);
    const C = BigInt(tokens[ptr++]);

    let cur = S;
    let daysPassed = 1n;
    while (daysPassed < D && cur < L) {
      cur *= (1n + C);
      daysPassed++;
    }

    if (cur >= L) {
      out.push('ALIVE AND KICKING');
    } else {
      out.push('DEAD AND ROTTING');
    }
  }

  console.log(out.join('\n'));
}

solve();

