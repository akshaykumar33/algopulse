const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(tokens[ptr++]);
    const g = BigInt(tokens[ptr++]);
    const b = BigInt(tokens[ptr++]);

    const need = (n + 1n) / 2n;
    const full = (need - 1n) / g;
    const rem = need - full * g;
    let ans = full * (g + b) + rem;
    if (ans < n) ans = n;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
