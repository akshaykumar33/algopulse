const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const k = Math.min(n, m);
  const out = [k + 1];
  for (let i = 0; i <= k; i++) {
    out.push(i + ' ' + (k - i));
  }
  console.log(out.join('\n'));
}

solve();
