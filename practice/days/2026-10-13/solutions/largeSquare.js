const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(lines[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const [n, a] = lines[i].split(' ').map(Number);
    const k = Math.floor(Math.sqrt(n));
    out.push(k * a);
  }
  console.log(out.join('\n'));
}

solve();
