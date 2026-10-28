const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = BigInt(tokens[ptr++]);
    }

    if (n % 2 === 1) {
      out.push('YES');
      continue;
    }

    let diff = 0n;
    for (let i = 0; i < n; i += 2) {
      diff += a[i + 1] - a[i];
    }

    out.push(diff >= 0n ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

