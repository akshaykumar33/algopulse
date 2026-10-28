const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const s = tokens[1];

  let ans = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === '0') ans++;
    else break;
  }

  console.log(ans);
}

solve();

