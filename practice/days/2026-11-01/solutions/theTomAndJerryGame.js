const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let ts = BigInt(tokens[ptr++]);
    let shift = 1n;
    while ((ts & 1n) === 0n) {
      ts >>= 1n;
    }
    out.push((ts >> 1n).toString());
  }

  console.log(out.join('\n'));
}

solve();

