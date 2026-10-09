const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    if (!input[i]) break;
    const n = parseInt(input[i].trim(), 10);
    if (n % 3 === 0) {
      out.push(0);
    } else {
      const next5 = (Math.floor(n / 5) + 1) * 5;
      if ((n + 1) % 3 === 0 || next5 % 3 === 0) {
        out.push(1);
      } else {
        out.push(2);
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
