const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  let ans = Infinity;
  for (let i = 1; i <= n; i++) {
    const a = parseInt(tokens[ptr++], 10);
    const maxDist = Math.max(i - 1, n - i);
    if (maxDist > 0) {
      const k = Math.floor(a / maxDist);
      if (k < ans) ans = k;
    }
  }
  console.log(ans);
}

solve();
