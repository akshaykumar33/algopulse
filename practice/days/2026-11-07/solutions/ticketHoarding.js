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
    let k = BigInt(tokens[ptr++]);

    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    a.sort();

    let totalCost = 0n;
    let held = 0n;

    for (let i = 0; i < n; i++) {
      const take = k < m ? k : m;
      totalCost += take * (BigInt(Math.round(a[i])) + held);
      k -= take;
      held += take;
      if (k === 0n) break;
    }

    out.push(totalCost.toString());
  }

  console.log(out.join('\n'));
}

solve();
