const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const k = parseInt(tokens[pos++], 10);
    const c = Math.floor(k / 2);
    const shift = c + 1;
    for (let i = 0; i < k; i++) {
      const row = [];
      for (let j = 0; j < k; j++) {
        const val = ((j - i - shift) % k + k) % k + 1;
        row.push(val);
      }
      out.push(row.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
