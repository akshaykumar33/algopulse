const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const n = parseInt(tokens[0], 10);
  const k = parseInt(tokens[1], 10);

  if (2 * k >= n) {
    console.log(-1);
    return;
  }

  const out = [];
  out.push((n * k).toString());
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      const opp = ((i - 1 + j) % n) + 1;
      out.push(i + ' ' + opp);
    }
  }

  console.log(out.join('\n'));
}

solve();
