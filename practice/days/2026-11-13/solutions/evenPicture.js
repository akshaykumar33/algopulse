const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);

  const out = [];
  const k = 3 * n + 4;
  out.push(k);
  out.push('0 0');

  for (let i = 0; i <= n; i++) {
    out.push((i + 1) + ' ' + i);
    out.push(i + ' ' + (i + 1));
    out.push((i + 1) + ' ' + (i + 1));
  }

  console.log(out.join('\n'));
}

solve();
