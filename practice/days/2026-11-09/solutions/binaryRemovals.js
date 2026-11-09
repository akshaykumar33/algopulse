const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = BigInt(tokens[ptr++]);
    const k = BigInt(tokens[ptr++]);
    const s = tokens[ptr++];

    let invs = 0n;
    let ones = 0n;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 49) {
        ones++;
      } else {
        invs += ones;
      }
    }

    if (invs <= x && invs % k === 0n) {
      out.push(1);
    } else {
      out.push(2);
    }
  }

  console.log(out.join('\n'));
}

solve();
