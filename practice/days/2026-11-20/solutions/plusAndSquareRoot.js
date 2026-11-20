const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = BigInt(input);

  const out = [];
  out.push('2');
  for (let k = 2n; k <= n; k++) {
    const term = k * (k + 1n) * (k + 1n) - (k - 1n);
    out.push(term.toString());
  }

  console.log(out.join('\n'));
}

solve();
