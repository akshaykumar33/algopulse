const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);

    const setA = new Set();
    for (let i = 0; i < n; i++) {
      setA.add(parseInt(tokens[ptr++], 10));
    }

    let common = 0;
    for (let i = 0; i < m; i++) {
      const val = parseInt(tokens[ptr++], 10);
      if (setA.has(val)) common++;
    }

    const cA = n - common;
    const cB = m - common;

    const ans = Math.min(2 * cA + 1, 2 * cB + 2);
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

