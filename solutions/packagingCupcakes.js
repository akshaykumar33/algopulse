const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const n = parseInt(input[i], 10);
    out.push(Math.floor(n / 2) + 1);
  }
  console.log(out.join('\n'));
}

solve();
