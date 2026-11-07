const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const d = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      d[i] = parseInt(tokens[ptr++], 10);
    }
    d.sort();

    let ans = BigInt(Math.round(d[n - 1]));
    let sumPref = 0n;

    for (let i = 0; i < n; i++) {
      const val = BigInt(Math.round(d[i]));
      ans -= (BigInt(i) * val - sumPref);
      sumPref += val;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
