const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const [x, y] = input[i].trim().split(/\s+/).map(Number);
    const m = Math.floor((x + y) / 3);
    out.push(m + Math.min(m, y));
  }
  console.log(out.join('\n'));
}

solve();
