const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const [n, k] = input[i].split(/\s+/).map(Number);
    out.push(Math.floor(k / n));
  }
  console.log(out.join('\n'));
}

solve();
