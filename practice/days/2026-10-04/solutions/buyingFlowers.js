const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = Number(input[0]);
  const out = [];

  for (let i = 1; i <= t; i++) {
    const n = Number(input[i]);
    if (n < 2) {
      out.push(-1);
    } else if (n % 3 === 0) {
      out.push(Math.floor(n / 3) * 5);
    } else if (n % 3 === 1) {
      if (n < 4) out.push(-1);
      else out.push(Math.floor((n - 4) / 3) * 5 + 8);
    } else {
      out.push(Math.floor(n / 3) * 5 + 4);
    }
  }

  console.log(out.join('\n'));
}

solve();
