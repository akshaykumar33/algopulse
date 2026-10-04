const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(lines[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const [x, y] = lines[i].split(' ').map(BigInt);
    const diff = x - y;
    if (diff > 1n) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
