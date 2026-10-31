const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const c = BigInt(tokens[ptr++]);
    const d = BigInt(tokens[ptr++]);
    const l = BigInt(tokens[ptr++]);

    if (l % 4n !== 0n) {
      out.push('no');
      continue;
    }

    const maxLegs = 4n * (c + d);
    const minCatsOnGround = c > 2n * d ? c - 2n * d : 0n;
    const minLegs = 4n * (d + minCatsOnGround);

    if (l >= minLegs && l <= maxLegs) {
      out.push('yes');
    } else {
      out.push('no');
    }
  }

  console.log(out.join('\n'));
}

solve();

