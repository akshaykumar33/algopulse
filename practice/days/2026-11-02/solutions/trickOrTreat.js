const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);

    const countA = new Map();
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      const rem = val % m;
      countA.set(rem, (countA.get(rem) || 0) + 1);
    }

    const countB = new Map();
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      const rem = val % m;
      countB.set(rem, (countB.get(rem) || 0) + 1);
    }

    let ans = 0n;
    for (const [r, cA] of countA.entries()) {
      const needed = (m - r) % m;
      const cB = countB.get(needed) || 0;
      ans += BigInt(cA) * BigInt(cB);
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

