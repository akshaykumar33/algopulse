const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    if (n % 2 === 0) {
      out.push('NO');
      continue;
    }
    out.push('YES');
    const half = (n - 1) / 2;
    for (let i = 0; i < n; i++) {
      let row = '';
      for (let j = 0; j < n; j++) {
        if (i === j) {
          row += '0';
        } else {
          const diff = (j - i + n) % n;
          row += diff <= half ? '1' : '0';
        }
      }
      out.push(row);
    }
  }

  console.log(out.join('\n'));
}

solve();
