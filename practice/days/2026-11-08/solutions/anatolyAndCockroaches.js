const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const s = tokens[1];

  let r1 = 0, b1 = 0;
  let r2 = 0, b2 = 0;

  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (i % 2 === 0) {
      if (c !== 'r') r1++;
      if (c !== 'b') b2++;
    } else {
      if (c !== 'b') b1++;
      if (c !== 'r') r2++;
    }
  }

  const cost1 = Math.max(r1, b1);
  const cost2 = Math.max(r2, b2);
  console.log(Math.min(cost1, cost2));
}

solve();
