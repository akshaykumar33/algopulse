const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const l = BigInt(tokens[ptr++]);
    const r = BigInt(tokens[ptr++]);
    const m = BigInt(tokens[ptr++]);
    const delta = r - l;

    let ansA = 0n, ansB = 0n, ansC = 0n;

    for (let a = l; a <= r; a++) {
      const rem = m % a;
      if (m >= a && rem <= delta) {
        ansA = a;
        ansB = l + rem;
        ansC = l;
        break;
      }
      if (a - rem <= delta) {
        ansA = a;
        ansB = l;
        ansC = l + (a - rem);
        break;
      }
    }

    out.push(ansA + ' ' + ansB + ' ' + ansC);
  }

  console.log(out.join('\n'));
}

solve();
