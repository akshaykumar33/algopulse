const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = BigInt(tokens[0]);
  const m = BigInt(tokens[1]);
  const k = BigInt(tokens[2]);
  const l = BigInt(tokens[3]);

  const p = (k + l + m - 1n) / m;
  if (p * m > n) {
    console.log('-1');
  } else {
    console.log(p.toString());
  }
}

solve();
