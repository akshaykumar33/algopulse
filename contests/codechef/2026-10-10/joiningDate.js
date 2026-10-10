const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const [n, k] = input[i].trim().split(/\s+/).map(Number);
    const dayN = Math.floor((n - 1) / 5);
    const dayK = Math.floor((k - 1) / 5);
    out.push(dayN - dayK);
  }
  console.log(out.join('\n'));
}

solve();
