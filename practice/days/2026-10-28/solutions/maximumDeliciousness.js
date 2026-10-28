const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const l = parseInt(tokens[ptr++], 10);

    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(BigInt(tokens[ptr++]));
    }

    a.sort((u, v) => (v > u ? 1 : v < u ? -1 : 0));

    let sum = 0n;
    for (let i = l - 1; i < n; i += k) {
      sum += a[i];
    }

    out.push(sum.toString());
  }

  console.log(out.join('\n'));
}

solve();

