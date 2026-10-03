const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const out = [];

  for (let tc = 1; tc <= t; tc++) {
    const [n, m, k] = input[tc].trim().split(/\s+/).map(Number);
    const perPlayer = Math.floor(n / k);
    const w = Math.min(m, perPlayer);
    const rem = m - w;
    const otherMax = Math.ceil(rem / (k - 1));
    out.push(w - otherMax);
  }

  console.log(out.join('\n'));
}

solve();
