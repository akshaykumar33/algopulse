const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = BigInt(tokens[ptr++]);
    const p = [];
    for (let i = 0; i < n; i++) {
      p.push(BigInt(tokens[ptr++]));
    }

    p.sort((a, b) => (b > a ? 1 : b < a ? -1 : 0));

    let sum = 0n;
    let count = 0;
    for (let i = 0; i < n; i++) {
      if (sum >= m) break;
      sum += p[i];
      count++;
    }

    if (sum >= m) {
      out.push(count);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();

