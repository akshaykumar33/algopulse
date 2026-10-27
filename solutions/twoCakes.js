const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const a = parseInt(tokens[1], 10);
  const b = parseInt(tokens[2], 10);

  let ans = 0;
  for (let x = 1; x < n; x++) {
    const y = n - x;
    const cur = Math.min(Math.floor(a / x), Math.floor(b / y));
    if (cur > ans) ans = cur;
  }
  console.log(ans);
}

solve();
