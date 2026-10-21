const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const n = parseInt(input[i], 10);
    if (n % 2 === 0) {
      out.push(n / 2);
    } else {
      out.push(-Math.floor((n + 1) / 2));
    }
  }
  console.log(out.join('\n'));
}

solve();
