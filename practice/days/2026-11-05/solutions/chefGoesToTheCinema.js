const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const x = parseInt(tokens[ptr++], 10);
    let k = 0;
    while ((k + 1) * (k + 2) <= x) {
      k++;
    }
    const rem = x - k * (k + 1);
    let ans = 2 * k;
    if (rem > 0) {
      if (rem <= k + 1) {
        ans += 1;
      } else {
        ans += 2;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
