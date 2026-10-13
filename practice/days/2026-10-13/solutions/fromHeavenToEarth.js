const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(lines[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const [n, v1, v2] = lines[i].split(' ').map(Number);
    const t1 = (Math.sqrt(2) * n) / v1;
    const t2 = (2 * n) / v2;
    if (t1 < t2) {
      out.push('Stairs');
    } else {
      out.push('Elevator');
    }
  }
  console.log(out.join('\n'));
}

solve();
